var router = require('express').Router();
const UsersController = require('../controllers/users');

router
    .post('/', UsersController.createUser)
    .get('/', UsersController.users)
    .get('/:id', UsersController.user)
    .post('/login', UsersController.login);

module.exports = router;