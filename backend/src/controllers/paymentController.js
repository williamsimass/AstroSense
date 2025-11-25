const PaymentService = require('../services/paymentService');

class PaymentController {
    static async createPreference(req, res) {
        try {
            const { packageId } = req.body;
            const userId = req.user.id;

            const result = await PaymentService.createTransaction(userId, packageId);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    static async webhook(req, res) {
        try {
            // In a real scenario, verify signature
            const { transactionId, status } = req.body;

            const result = await PaymentService.processWebhook(transactionId, status);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Webhook failed' });
        }
    }

    // Helper for mock checkout
    static async mockPay(req, res) {
        try {
            const { transactionId } = req.params;
            // Simulate success
            await PaymentService.processWebhook(transactionId, 'paid');
            return res.json({ message: 'Payment successful! Credits added.' });
        } catch (error) {
            return res.status(500).json({ error: 'Payment failed' });
        }
    }
}

module.exports = PaymentController;
