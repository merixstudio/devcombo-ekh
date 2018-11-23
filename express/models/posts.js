const Sequelize = require('sequelize');
const sequelize = require('../db');

const PostModel = sequelize.define('post', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    releasedAt: Sequelize.DATE,
    authorId: Sequelize.INTEGER,
});


module.exports = PostModel;