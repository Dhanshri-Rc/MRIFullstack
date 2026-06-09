const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Admin
router.get('/admin/template', auth, ctrl.downloadTemplate);
router.post('/admin/articles', auth, upload.single('pdfFile'), ctrl.create);
router.put('/admin/articles/:id', auth, upload.single('pdfFile'), ctrl.update);
router.delete('/admin/articles/:id', auth, ctrl.remove);
router.post('/admin/articles/bulk-upload', auth, upload.single('excelFile'), ctrl.bulkUpload);

module.exports = router;
