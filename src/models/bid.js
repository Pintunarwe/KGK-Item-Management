const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Item = require('./item');

const Bid = sequelize.define('Bid', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemId: { type: DataTypes.INTEGER, references: { model: Item, key: 'id' }, allowNull: false },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, allowNull: false },
    bidAmount: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Bid;
