const UsersController = require('../controllers/users');

const PREFIX = '/api';

const users = [{
    method: 'GET',
    path: `${PREFIX}/users`,
    handler: UsersController.users
}, {
    method: 'POST',
    path: `${PREFIX}/users`,
    handler: UsersController.createUser
}, {
    method: 'GET',
    path: `${PREFIX}/users/{id}`,
    handler: UsersController.user
}, {
    method: 'PATCH',
    path: `${PREFIX}/users/{id}`,
    handler: UsersController.updateUser
}, {
    method: 'POST',
    path: `${PREFIX}/users/login`,
    handler: UsersController.login
}];

module.exports = users;