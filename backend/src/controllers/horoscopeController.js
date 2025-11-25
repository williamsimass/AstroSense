const HoroscopeService = require('../services/horoscopeService');

class HoroscopeController {
    static async query(req, res) {
        try {
            const { type, ...data } = req.body;
            const userId = req.user.id;

            // Inject user data into data object for custom queries
            if (type === 'custom') {
                data.user = req.user;
            }

            const result = await HoroscopeService.processQuery(userId, type, data);
            return res.json(result);
        } catch (error) {
            if (error.message === 'Insufficient credits') {
                return res.status(403).json({ error: 'Insufficient credits' });
            }
            console.error(error);
            return res.status(500).json({ error: 'Query failed' });
        }
    }

    static async getHistory(req, res) {
        try {
            const queries = await req.user.getQueries({
                order: [['createdAt', 'DESC']],
                limit: 20
            });
            return res.json(queries);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch history' });
        }
    }
}

module.exports = HoroscopeController;
