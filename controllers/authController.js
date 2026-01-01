const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { baseResponse } = require('../utils/response');
const { UnauthorizedError } = require('../utils/errors');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username },
      ],
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        throw new UnauthorizedError('Email already registered');
      }
      if (existingUser.username === username) {
        throw new UnauthorizedError('Username already taken');
      }
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role: 'User',
    });

  
    const userResponse = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.status(201).json(
      baseResponse(true, 'User registered successfully', userResponse)
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

   
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(200).json(
      baseResponse(true, 'Login successful', { token })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};