const sequelize = require('../db');

const UsersModel = require('./users');
const PostsModel = require('./posts');

// Relations
UsersModel.hasMany(PostsModel, {
    as: 'posts',
    foreignKey: 'authorId',
});
PostsModel.belongsTo(UsersModel, {
    as: 'author',
    foreignKey: 'authorId',
});

sequelize.sync();

module.exports = {
    UsersModel,
    PostsModel,
};