const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/journalController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Admin
router.post('/admin/journals', auth, upload.single('coverImage'), ctrl.create);
router.put('/admin/journals/:id', auth, upload.single('coverImage'), ctrl.update);
router.delete('/admin/journals/:id', auth, ctrl.remove);

module.exports = router;
