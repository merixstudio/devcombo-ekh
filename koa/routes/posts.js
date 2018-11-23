const Router = require('koa-router');
const PostsController = require('../controllers/posts');

const postsRouter = new Router();

postsRouter
    .get('/', PostsController.posts)
    .post('/', PostsController.createPost)
    .get('/:id', PostsController.post)
    .patch('/:id', PostsController.updatePost)
    .delete('/:id', PostsController.deletePost);

module.exports = postsRouter.routes();