const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tlif_db', 'root', 'test-password', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
});

module.exports = sequelize;
