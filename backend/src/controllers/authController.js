const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const CreditService = require('../services/creditService');

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, birth_date } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const password_hash = await bcrypt.hash(password, 10);

            // Simple sign derivation (mock)
            const sign = 'Aries'; // TODO: Implement real derivation based on birth_date

            const user = await User.create({
                name,
                email,
                password_hash,
                birth_date,
                sign,
            });

            await CreditService.initializeCredit(user.id);

            const token = generateToken({ id: user.id });

            return res.status(201).json({ user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Registration failed' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Check daily credit on login
            const dailyStatus = await CreditService.checkAndClaimDaily(user.id);

            const token = generateToken({ id: user.id });

            return res.json({ user, token, dailyStatus });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Login failed' });
        }
    }

    static async me(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                include: 'credit'
            });
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching user' });
        }
    }
}

module.exports = AuthController;
