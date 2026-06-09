const { pool } = require('../config/db');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const {
  search,
  q,
  journal,
  journalId,
  page = 1,
  limit = 10,
  subjectArea,
  accessType,
  year,
} = req.query;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1=1';
    const params = [];


   const searchText = (search || q || "").trim();

if (searchText) {
  where += `
    AND (
      a.title LIKE ? OR
      a.subtitle LIKE ? OR
      a.abstract LIKE ? OR
      a.keywords LIKE ? OR
      a.authors LIKE ? OR
      j.title LIKE ? OR
      j.shortTitle LIKE ?
    )
  `;

  const s = `%${searchText}%`;
  params.push(s, s, s, s, s, s, s);
}
    const selectedJournalId = journalId || journal;

if (selectedJournalId && selectedJournalId !== "all") {
  where += " AND a.journalId = ?";
  params.push(selectedJournalId);
}
    if (year && year !== 'all') {
      where += ' AND YEAR(a.publicationDate) = ?';
      params.push(year);
    }
    if (subjectArea && subjectArea !== 'all') {
      where += ' AND j.subjectArea = ?';
      params.push(subjectArea);
    }
    if (accessType && accessType !== 'all') {
      where += ' AND j.accessType = ?';
      params.push(accessType);
    }

    const [rows] = await pool.query(
      `SELECT a.*, j.title as journalName, j.subjectArea, j.accessType, j.coverImage as journalCover
       FROM articles a
       LEFT JOIN journals j ON a.journalId = j.id
       ${where} ORDER BY a.createdAt DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM articles a LEFT JOIN journals j ON a.journalId = j.id ${where}`,
      params
    );

    res.json({ success: true, data: rows, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, j.title as journalName FROM articles a LEFT JOIN journals j ON a.journalId = j.id WHERE a.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      journalId,
      publicationDate,
      volume,
      issue,
      pages,
      title,
      doi,
      keywords,
      citation,
      articleUrl,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const articleId = "ART-" + Date.now();

    const sql = `
      INSERT INTO articles (
        journalId,
        publicationDate,
        volume,
        issue,
        pages,
        title,
        doi,
        keywords,
        citation,
        articleUrl,
        articleId,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      journalId || null,
      publicationDate || null,
      volume || "",
      issue || "",
      pages || "",
      title,
      doi || "",
      keywords || "",
      citation || "",
      articleUrl || "",
      articleId,
      "published",
    ];

    const [result] = await pool.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const allowed = [
      "journalId",
      "articleType",
      "publicationDate",
      "volume",
      "issue",
      "pages",
      "title",
      "subtitle",
      "doi",
      "doiLink",
      "issnPrint",
      "issnOnline",
      "permalink",
      "shortTitle",
      "abstract",
      "keywords",
      "authors",
      "affiliations",
      "status",
      "citation",
      "articleUrl",
    ];

    const fields = {};

    allowed.forEach((k) => {
      if (req.body[k] !== undefined) {
        fields[k] = req.body[k];
      }
    });

    

    if (req.file) {
      fields.pdfFile = `/uploads/${req.file.filename}`;
    }

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    const setClause = Object.keys(fields)
      .map((k) => `${k} = ?`)
      .join(", ");

    const values = [...Object.values(fields), req.params.id];

    await pool.query(
      `UPDATE articles SET ${setClause} WHERE id = ?`,
      values
    );

    res.json({
      success: true,
      message: "Article updated successfully",
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.bulkUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { journalId, skipEmpty = true, updateExisting = true } = req.body;

    const wb = XLSX.readFile(req.file.path);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

    if (!rows.length) return res.status(400).json({ success: false, message: 'Excel file is empty' });

    let inserted = 0, updated = 0, skipped = 0;
    const errors = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const title = (row['Article Title'] || row['title'] || '').trim();

      if (!title) {
        if (skipEmpty === 'true' || skipEmpty === true) { skipped++; continue; }
        else { errors.push(`Row ${i + 2}: Missing article title`); continue; }
      }

  const articleData = {
  journalId: journalId || null,
  title,

  publicationDate:
    row["Publication Date"] || row["publicationDate"] || null,

  volume: String(row["Volume"] || row["volume"] || ""),
  issue: String(row["Issue"] || row["issue"] || ""),
  pages: String(row["Pages"] || row["pages"] || ""),

  doi: row["DOI"] || row["doi"] || "",
  keywords: row["Keywords"] || row["keywords"] || "",

  // 🔥 FIXED CITATION
  citation:
    (row["How to cite"] ||
      row["How To Cite"] ||
      row["citation"] ||
      "").trim(),

  // 🔥 NEW FIELD
  articleUrl: row["Article URL"] || row["url"] || "",

  status: "published",
};

      // fix null date
      if (!articleData.publicationDate || articleData.publicationDate === '') {
        articleData.publicationDate = null;
      }

      if (updateExisting === 'true' || updateExisting === true) {
        const [existing] = await pool.query(
          'SELECT id FROM articles WHERE doi = ? AND doi != ""', [articleData.doi]
        );
        if (existing.length && articleData.doi) {
          const setClause = Object.keys(articleData).map(k => `${k} = ?`).join(', ');
          await pool.query(`UPDATE articles SET ${setClause} WHERE id = ?`,
            [...Object.values(articleData), existing[0].id]);
          updated++;
          continue;
        }
      }

      const cols = Object.keys(articleData).join(', ');
      const placeholders = Object.keys(articleData).map(() => '?').join(', ');
      await pool.query(
        `INSERT INTO articles (${cols}) VALUES (${placeholders})`,
        Object.values(articleData)
      );
      inserted++;
    }

    // cleanup uploaded file
    fs.unlink(req.file.path, () => {});

    res.json({
      success: true,
      message: `Import complete: ${inserted} inserted, ${updated} updated, ${skipped} skipped`,
      inserted, updated, skipped, errors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Import failed: ' + err.message });
  }
};

exports.downloadTemplate = (req, res) => {
  const wb = XLSX.utils.book_new();

  const data = [
    [
      "Article Title",
      "Journal Name",
      "Publication Date",
      "Volume",
      "Issue",
      "Pages",
      "DOI",
      "Keywords",
      "How to cite",
    ],
    [
      "Sample Article Title",
      "Journal Name Here",
      "2025-01-15",
      "12",
      "1",
      "1-10",
      "10.1234/sample.2025.001",
      "keyword1, keyword2",
      "Author, A. (2025). Sample Article Title. Journal Name, 12(1), 1-10.",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Articles");

  const buffer = XLSX.write(wb, {
    type: "buffer",
    bookType: "xlsx",
  });

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=article_template.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
};
