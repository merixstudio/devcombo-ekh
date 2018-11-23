const Router = require('koa-router');
const UsersController = require('../controllers/users');

const usersRouter = new Router();

usersRouter
    .get('/', UsersController.users)
    .post('/', UsersController.createUser)
    .get('/:id', UsersController.user)
    .patch('/:id', UsersController.updateUser)
    .post('/login', UsersController.login);

module.exports = usersRouter;