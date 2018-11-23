var router = require('express').Router();
const postsController = require('../controllers/posts');

router
    .post('/', postsController.createPost)
    .get('/', postsController.posts)
    .patch('/:id', postsController.updatePost)
    .delete('/:id', postsController.deletePost)
    .get('/:id', postsController.post);

module.exports = router;