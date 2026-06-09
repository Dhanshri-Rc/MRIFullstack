const { pool } = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",   // 🔥 MUST ADD
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

const sendMail = require("../utils/sendMail");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ SAVE TO DATABASE (THIS WAS MISSING)
    await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)",
      [name, email, subject, message, "pending"]
    );

    // 2️⃣ SEND EMAIL
    try {
      await sendMail({ name, email, subject, message });
    } catch (mailErr) {
      console.log("Email failed but message saved:", mailErr.message);
    }

    res.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getContactInfo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_info LIMIT 1');
    res.json({ success: true, data: rows[0] || {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateContactInfo = async (req, res) => {
  try {
    const { email, phone, address, workingHours } = req.body;
    const [rows] = await pool.query('SELECT id FROM contact_info LIMIT 1');
    if (rows.length) {
      await pool.query(
        'UPDATE contact_info SET email=?, phone=?, address=?, workingHours=? WHERE id=?',
        [email, phone, address, workingHours, rows[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO contact_info (email, phone, address, workingHours) VALUES (?,?,?,?)',
        [email, phone, address, workingHours]
      );
    }
    res.json({ success: true, message: 'Contact info updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    await pool.query(
      "UPDATE contact_messages SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    res.json({
      success: true,
      message: `Message marked as ${status}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



