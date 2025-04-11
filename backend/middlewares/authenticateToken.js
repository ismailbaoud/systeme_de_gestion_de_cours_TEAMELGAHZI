const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');

const authenticateToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided in session.' });
    }

    if (AuthController.isTokenBlacklisted && AuthController.isTokenBlacklisted(token)) {
        return res.status(403).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        req.user = user; 
        next(); 
    });
};

module.exports = authenticateToken;
