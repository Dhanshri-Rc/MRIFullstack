const { pool } = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });

    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    // Send email (non-blocking)
    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: `"MRI Xplore" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO,
        subject: `New Contact Message: ${subject || 'General Inquiry'}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      });
    } catch (mailErr) {
      console.error('Email send failed:', mailErr.message);
      // Don't fail the request if email fails
    }

    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
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