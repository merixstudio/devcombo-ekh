const Sequelize = require('sequelize');
const sequelize = require('../db');

const UserModel = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = UserModel;