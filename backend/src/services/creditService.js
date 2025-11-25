const { Credit, User, sequelize } = require('../models');
const { Op } = require('sequelize');

class CreditService {
    static async initializeCredit(userId) {
        return await Credit.create({
            user_id: userId,
            balance: 0,
            last_daily_claim: null,
        });
    }

    static async checkAndClaimDaily(userId) {
        const credit = await Credit.findOne({ where: { user_id: userId } });
        if (!credit) throw new Error('Credit record not found');

        const today = new Date().toISOString().split('T')[0];

        if (credit.last_daily_claim !== today) {
            // Reset daily credit logic: 
            // Option A: Just add 1 credit if not claimed today.
            // Option B: Set a specific "daily" flag. 
            // Requirement: "Ganha 1 CRÉDITO GRATUITO POR DIA". 
            // Let's assume this adds to the balance, but maybe we want to separate "free" vs "paid".
            // For simplicity, we add 1 to balance and update date.

            credit.balance += 1;
            credit.last_daily_claim = today;
            await credit.save();
            return { claimed: true, newBalance: credit.balance };
        }

        return { claimed: false, balance: credit.balance };
    }

    static async consumeCredit(userId) {
        const credit = await Credit.findOne({ where: { user_id: userId } });
        if (!credit) throw new Error('Credit record not found');

        if (credit.balance <= 0) {
            return false;
        }

        credit.balance -= 1;
        await credit.save();
        return true;
    }

    static async addCredits(userId, amount) {
        const credit = await Credit.findOne({ where: { user_id: userId } });
        if (!credit) throw new Error('Credit record not found');

        credit.balance += amount;
        await credit.save();
        return credit.balance;
    }
}

module.exports = CreditService;
