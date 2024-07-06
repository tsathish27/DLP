// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Get token from headers, cookies, or wherever you're sending it from
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Assuming the user information is stored in the 'user' field of the token// middleware/authMiddleware.js

        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET;
        
        const authMiddleware = (req, res, next) => {
            // Get token from the Authorization header
            const authHeader = req.headers.authorization;
        
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token is required' });
            }
        
            const token = authHeader.split(' ')[1]; // Extract the token part from 'Bearer <token>'
        
            try {
                // Verify token
                const decoded = jwt.verify(token, JWT_SECRET);
                req.user = decoded.user; // Assuming the user information is stored in the 'user' field of the token
                next();
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        };
        
        module.exports = authMiddleware;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

 