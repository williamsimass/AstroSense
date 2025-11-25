const express = require('express');
const PaymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes
router.post('/create', authMiddleware, PaymentController.createPreference);

// Webhook (usually public but verified by signature)
router.post('/webhook', PaymentController.webhook);

// Mock checkout endpoint
router.get('/mock-checkout/:transactionId', PaymentController.mockPay);

module.exports = router;
