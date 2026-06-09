const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' });

  if (
    email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase() ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    token,
    admin: { email, role: 'admin', name: 'Admin User' },
  });
};
