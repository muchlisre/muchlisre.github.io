const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;