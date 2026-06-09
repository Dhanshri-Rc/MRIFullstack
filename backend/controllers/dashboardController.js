const { pool } = require("../config/db");

exports.getStats = async (req, res) => {
  try {
    const [[journals]] = await pool.query(
      `SELECT COUNT(*) AS count FROM journals`
    );

    const [[articles]] = await pool.query(
      `SELECT COUNT(*) AS count FROM articles`
    );

  const [[authors]] = await pool.query(
  `SELECT COUNT(DISTINCT TRIM(author_name)) AS count
   FROM (
     SELECT SUBSTRING_INDEX(
       SUBSTRING_INDEX(COALESCE(authors, ''), ',', n.n),
       ',',
       -1
     ) AS author_name
     FROM articles
     CROSS JOIN (
       SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
       SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
     ) n
     WHERE n.n <= 1 + LENGTH(COALESCE(authors, ''))
       - LENGTH(REPLACE(COALESCE(authors, ''), ',', ''))
   ) a
   WHERE TRIM(author_name) != ''`
);

    const [[institutions]] = await pool.query(
      `SELECT COUNT(DISTINCT TRIM(inst_name)) AS count
       FROM (
         SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(COALESCE(affiliations, ''), ',', n.n), ',', -1) AS inst_name
         FROM articles
         CROSS JOIN (
           SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
         ) n
         WHERE n.n <= 1 + LENGTH(COALESCE(affiliations, '')) - LENGTH(REPLACE(COALESCE(affiliations, ''), ',', ''))
       ) t
       WHERE TRIM(inst_name) != ''`
    );

    const [recentUploads] = await pool.query(
      `SELECT 
          a.id,
          a.title,
          COALESCE(j.title, 'No Journal') AS journalName,
          a.createdAt
       FROM articles a
       LEFT JOIN journals j ON a.journalId = j.id
       ORDER BY a.createdAt DESC
       LIMIT 5`
    );

    const [recentJournals] = await pool.query(
      `SELECT 
          j.id,
          j.title,
          j.status,
          j.createdAt,
          (SELECT COUNT(*) FROM articles WHERE journalId = j.id) AS articleCount
       FROM journals j
       ORDER BY j.createdAt DESC
       LIMIT 5`
    );

    const [subjectStats] = await pool.query(
      `SELECT 
          COALESCE(j.subjectArea, 'Uncategorized') AS subjectArea,
          COUNT(a.id) AS count
       FROM articles a
       LEFT JOIN journals j ON a.journalId = j.id
       GROUP BY COALESCE(j.subjectArea, 'Uncategorized')
       ORDER BY count DESC
       LIMIT 8`
    );

    const [articlesOverTime] = await pool.query(
      `SELECT 
          DATE_FORMAT(createdAt, '%b %Y') AS month,
          COUNT(*) AS count
       FROM articles
       GROUP BY DATE_FORMAT(createdAt, '%Y-%m'), DATE_FORMAT(createdAt, '%b %Y')
       ORDER BY MIN(createdAt)`
    );
const downloads = { count: 0 };
    res.json({
      success: true,
      data: {
        totalJournals: journals.count || 0,
        totalArticles: articles.count || 0,
        totalAuthors: authors.count || 0,
        totalInstitutions: institutions.count || 0,
        totalDownloads: downloads.count || 0,

        // Dashboard sections
        recentUploads,
        recentJournalEntries: recentJournals,
        articleSubjectAreaStats: subjectStats,
        articlesOverTime,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};