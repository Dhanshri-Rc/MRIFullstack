const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.get('/admin/dashboard/stats', auth, ctrl.getStats);

module.exports = router;
