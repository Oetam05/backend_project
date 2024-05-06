const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    token = token.split(' ')[1];  // Assume 'Bearer <token>'
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed',
      error: error.message
    });
  }
};

module.exports = authenticate;
