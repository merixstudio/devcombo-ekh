const PostsController = require('../controllers/posts');

const PREFIX = '/api';

const posts = [{
    method: 'GET',
    path: `${PREFIX}/posts`,
    handler: PostsController.posts,
}, {
    method: 'POST',
    path: `${PREFIX}/posts`,
    handler: PostsController.createPost,
}, {
    method: 'GET',
    path: `${PREFIX}/posts/{id}`,
    handler: PostsController.post,
}, {
    method: 'PATCH',
    path: `${PREFIX}/posts/{id}`,
    handler: PostsController.updatePost,
}, {
    method: 'DELETE',
    path: `${PREFIX}/posts/{id}`,
    handler: PostsController.deletePost,
}]

module.exports = posts;