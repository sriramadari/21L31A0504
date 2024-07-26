const authService = require('../services/authService');

const authMiddleware = async (req, res, next) => {
    try {
        const token = await authService.getAuthToken();
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;