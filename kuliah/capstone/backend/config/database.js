const { log } = require('console');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_fullstack_rps', 'root', 'bismillah',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;