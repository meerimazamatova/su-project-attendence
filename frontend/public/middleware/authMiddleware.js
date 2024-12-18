
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};