const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journals');
const articleRoutes = require('./routes/articles');
const contactRoutes = require('./routes/contact');
const dashboardRoutes = require('./routes/dashboard');


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth
app.use('/api/auth', authRoutes);

// Public journal routes
app.get('/api/journals', require('./controllers/journalController').getAll);
app.get('/api/journals/:id', require('./controllers/journalController').getOne);

// Admin journal routes
const auth = require('./middleware/auth');
const upload = require('./middleware/upload');
const jCtrl = require('./controllers/journalController');
app.post('/api/admin/journals', auth, upload.single('coverImage'), jCtrl.create);
app.put('/api/admin/journals/:id', auth, upload.single('coverImage'), jCtrl.update);
app.delete('/api/admin/journals/:id', auth, jCtrl.remove);

// Public article routes
const aCtrl = require('./controllers/articleController');
app.get('/api/articles', aCtrl.getAll);
app.get('/api/articles/:id', aCtrl.getOne);

// Admin article routes
app.get('/api/admin/template', auth, aCtrl.downloadTemplate);
app.post('/api/admin/articles/bulk-upload', auth, upload.single('excelFile'), aCtrl.bulkUpload);
app.post('/api/admin/articles', auth, upload.single('pdfFile'), aCtrl.create);
app.put('/api/admin/articles/:id', auth, upload.single('pdfFile'), aCtrl.update);
app.delete('/api/admin/articles/:id', auth, aCtrl.remove);

// Contact routes
const cCtrl = require('./controllers/contactController');
app.post('/api/contact', cCtrl.submitContact);
app.get('/api/contact-info', cCtrl.getContactInfo);
app.get('/api/admin/contact-messages', auth, cCtrl.getAll);
app.delete('/api/admin/contact-messages/:id', auth, cCtrl.remove);
app.put('/api/admin/contact-info', auth, cCtrl.updateContactInfo);
app.put('/api/admin/contact-messages/:id/status', auth, cCtrl.updateStatus);

// Dashboard
app.get('/api/admin/dashboard/stats', auth, require('./controllers/dashboardController').getStats);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 MRI Xplore Backend running on http://localhost:${PORT}`);
      console.log(`   Admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to initialize DB:', err.message);
    process.exit(1);
  });