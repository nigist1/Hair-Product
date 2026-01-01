const { baseResponse } = require('../utils/response');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    errors = Object.values(err.errors).map(e => e.message);
  }

 
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate entry';
    const field = Object.keys(err.keyPattern)[0];
    errors = [`${field} already exists`];
  }

  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    errors = ['Invalid ID provided'];
  }

 
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }


  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    if (err.errors) {
      errors = err.errors;
    }
  }

  
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).json(baseResponse(false, message, null, errors));
};

module.exports = errorHandler;