const { log } = require('console');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('webservice', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;