const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Notification;
