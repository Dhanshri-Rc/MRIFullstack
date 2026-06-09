const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Public
router.post('/contact', ctrl.submitContact);
router.get('/contact-info', ctrl.getContactInfo);

// Admin
router.get('/admin/contact-messages', auth, ctrl.getAll);
router.delete('/admin/contact-messages/:id', auth, ctrl.remove);
router.put('/admin/contact-info', auth, ctrl.updateContactInfo);
router.put('/admin/contact-messages/:id/status', auth, ctrl.updateStatus);

module.exports = router;