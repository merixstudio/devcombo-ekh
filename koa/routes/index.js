const Router = require('koa-router');
const usersRouter = require('./users');
const postsRouter = require('./posts');

const router = new Router();

router.prefix('/api');
router.use('/users', usersRouter.routes());
router.use('/posts', postsRouter);

module.exports = router.routes();