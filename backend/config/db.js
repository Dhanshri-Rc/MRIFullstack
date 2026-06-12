const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initDB() {
 const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await conn.end();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS journals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      shortTitle VARCHAR(255),
      description TEXT,
      issnPrint VARCHAR(50),
      issnOnline VARCHAR(50),
      publisher VARCHAR(255),
      subjectArea VARCHAR(255),
      indexing TEXT,
      accessType VARCHAR(100),
      coverImage VARCHAR(500),
      status ENUM('active','inactive') DEFAULT 'active',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      journalId INT,
      articleType VARCHAR(100),
      publicationDate DATE,
      volume VARCHAR(50),
      issue VARCHAR(50),
      pages VARCHAR(50),
      title VARCHAR(1000) NOT NULL,
      subtitle VARCHAR(500),
      doi VARCHAR(255),
      doiLink VARCHAR(500),
      articleId VARCHAR(100),
      issnPrint VARCHAR(50),
      issnOnline VARCHAR(50),
      permalink VARCHAR(500),
      shortTitle VARCHAR(300),
      abstract TEXT,
      keywords TEXT,
      authors TEXT,
      affiliations TEXT,
      pdfFile VARCHAR(500),
      status ENUM('draft','published','inactive') DEFAULT 'draft',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (journalId) REFERENCES journals(id) ON DELETE SET NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(500),
      message TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_info (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255),
      phone VARCHAR(100),
      address TEXT,
      workingHours VARCHAR(500),
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Insert default contact info if not exists
  const [rows] = await pool.query('SELECT id FROM contact_info LIMIT 1');
  if (rows.length === 0) {
    await pool.query(`
      INSERT INTO contact_info (email, phone, address, workingHours) VALUES (
        'support@mrixplore.org',
        '+91 9960266198',
        'Multidisciplinary Research Institute (MRI), 1 Institutional Area, Taramani, Chennai - 600113, Tamil Nadu, India',
        'Monday - Saturday: 9:00 AM - 6:00 PM IST'
      )
    `);
  }

  console.log('✅ Database initialized successfully');
}

module.exports = { pool, initDB };
