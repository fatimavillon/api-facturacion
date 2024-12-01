const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing_controller');

router.use('/', billingController);

module.exports = router;
