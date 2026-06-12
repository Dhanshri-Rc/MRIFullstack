const { pool } = require('../config/db');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const {
  search,
  subjectArea,
  accessType,
  frequency,
  language,
  establishedYear,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
} = req.query;
    const safePage = Number(page) || 1;
const safeLimit = Number(limit) || 10;
const offset = (safePage - 1) * safeLimit;

    let where = 'WHERE status = "active"';
    const params = [];

    if (search) {
      where += ' AND (title LIKE ? OR shortTitle LIKE ? OR publisher LIKE ? OR issnPrint LIKE ? OR issnOnline LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }
    if (subjectArea && subjectArea !== 'All') {
      where += ' AND subjectArea = ?';
      params.push(subjectArea);
    }
    if (accessType && accessType !== 'All') {
      where += ' AND accessType = ?';
      params.push(accessType);
    }
    if (frequency && frequency !== 'All Frequency') {
  where += ' AND frequency = ?';
  params.push(frequency);
}

if (language && language !== 'All Languages') {
  where += ' AND language = ?';
  params.push(language);
}

if (establishedYear && establishedYear !== 'All Years') {
  where += ' AND establishedYear = ?';
  params.push(establishedYear);
}
    const orderMap = { title: 'title ASC', newest: 'createdAt DESC', oldest: 'createdAt ASC' };
    const orderClause = orderMap[sortBy] || 'createdAt DESC';

   const [rows] = await pool.query(
  `SELECT *, (SELECT COUNT(*) FROM articles WHERE journalId = journals.id) as articleCount
   FROM journals ${where} ORDER BY ${orderClause} LIMIT ${safeLimit} OFFSET ${offset}`,
  params
);
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) as total FROM journals ${where}`, params);

    res.json({ success: true, data: rows, total, page: safePage, limit: safeLimit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
  success: false, 
  message: err.message 
});
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM journals WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Journal not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ 
  success: false, 
  message: err.message 
});
  }
};

exports.create = async (req, res) => {
  try {
    const {
      title,
      shortTitle,
      description,
      issnPrint,
      issnOnline,
      publisher,
      subjectArea,
      indexing,
      accessType,
      frequency,
      language,
      establishedYear,
      tags,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO journals 
      (title, shortTitle, description, issnPrint, issnOnline,
       publisher, subjectArea, indexing, accessType, frequency,
       language, establishedYear, tags, coverImage, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        shortTitle,
        description,
        issnPrint,
        issnOnline,
        publisher,
        subjectArea,
        indexing,
        accessType,
        frequency,
        language,
        establishedYear,
        tags,
        coverImage,
        status || 'active',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Journal created',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Create journal error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      title,
      shortTitle,
      description,
      issnPrint,
      issnOnline,
      publisher,
      subjectArea,
      indexing,
      accessType,
      frequency,
      language,
      establishedYear,
      tags,
      status,
    } = req.body;

    const coverImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const fields = {
      title,
      shortTitle,
      description,
      issnPrint,
      issnOnline,
      publisher,
      subjectArea,
      indexing,
      accessType,
      frequency,
      language,
      establishedYear,
      tags,
      status,
    };

    if (coverImage) fields.coverImage = coverImage;

    const keys = Object.keys(fields).filter((k) => fields[k] !== undefined);

    if (!keys.length) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      });
    }

    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = keys.map((k) => fields[k]);

    await pool.query(
      `UPDATE journals SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    res.json({
      success: true,
      message: 'Journal updated',
    });
  } catch (err) {
    console.error('Update journal error:', err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM journals WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Journal deleted' });
  } catch (err) {
    res.status(500).json({ 
  success: false, 
  message: err.message 
});
  }
};
