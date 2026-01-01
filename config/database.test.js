// Mock database configuration for tests
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
  dialect: 'sqlite',
  logging: false,
});

module.exports = sequelize;





