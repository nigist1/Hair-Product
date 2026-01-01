const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new UnauthorizedError('Invalid or expired token');
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    throw new ForbiddenError('Access denied. Admin role required');
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (!req.user || req.user.role !== 'User') {
    throw new ForbiddenError('Access denied. User role required');
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
  authorizeUser,
};





