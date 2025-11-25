const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'supersecretkey';
const EXPIRES_IN = '1d';

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
