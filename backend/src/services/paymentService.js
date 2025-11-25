const { Transaction, Credit } = require('../models');
const CreditService = require('./creditService');

class PaymentService {
    static async createTransaction(userId, packageId) {
        // Define packages
        const packages = {
            'small': { credits: 5, price: 9.90 },
            'medium': { credits: 15, price: 24.90 },
            'large': { credits: 50, price: 69.90 },
        };

        const pkg = packages[packageId];
        if (!pkg) {
            throw new Error('Invalid package');
        }

        const transaction = await Transaction.create({
            user_id: userId,
            amount: pkg.credits,
            price: pkg.price,
            status: 'pending',
            payment_provider_id: `mock_tx_${Date.now()}`,
        });

        // In a real scenario, we would call the payment gateway API here to get a checkout URL
        return {
            transactionId: transaction.id,
            checkoutUrl: `http://localhost:3000/payment/mock-checkout/${transaction.id}`, // Mock URL
            amount: pkg.credits,
            price: pkg.price
        };
    }

    static async processWebhook(transactionId, status) {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        if (transaction.status === 'paid') {
            return { message: 'Already paid' };
        }

        transaction.status = status;
        await transaction.save();

        if (status === 'paid') {
            await CreditService.addCredits(transaction.user_id, transaction.amount);
        }

        return { message: `Transaction updated to ${status}` };
    }
}

module.exports = PaymentService;
