const Models = require('../models');

async function posts(request, h) {
    return await Models.PostsModel.findAll();
}

async function createPost(request, h) {
    const bodyContent = request.payload;
    const requestHeaders = request.headers;

    if (requestHeaders['login-token']) {
        const post = await Models.PostsModel.create({
            title: bodyContent.title,
            content: bodyContent.content,
            releasedAt: bodyContent.releasedAt || new Date(),
            authorId: requestHeaders['login-token'],
        });

        if (post) {
            return h.response(post).code(201);
        }
    } else {
        return h.response('unauthorized').code(401);
    }
}

async function post(request, h) {
    const postId = request.params.id;
    const post = await Models.PostsModel.findByPk(postId, {
        include: [{
            as: 'author',
            model: Models.UsersModel,
            attributes: ['username', 'id'],
        }],
    });

    if (post) {
        return post;
    }

    return h.response('not found').code(404);
}

async function updatePost(request, h) {
    const bodyContent = request.payload
    const postId = parseInt(request.params.id, 10);
    const requestHeaders = request.headers;

    if (requestHeaders['login-token']) {
        const postUpdated = await Models.PostsModel.update(bodyContent, {
            where: {
                id: postId,
                authorId: requestHeaders['login-token'],
            },
        });

        if (postUpdated.length) {
            const post = await Models.PostsModel.findByPk(postId);

            return post;
        }

        return h.response('not found').code(404)
    }

    return h.response('unauthorized').code(401)
}

async function deletePost(request, h) {
    const postId = parseInt(request.params.id, 10);
    const requestHeaders = request.headers;

    if (requestHeaders['login-token']) {
        const deletedPosts = await Models.PostsModel.destroy({
            where: {
                id: postId,
                authorId: requestHeaders['login-token'],
            },
        });

        if (deletedPosts) {
            return h.response().code(204);
        }

        return h.response('not found').code(404);
    }

    return h.response('unathorized').code(401);
}

module.exports = {
    posts,
    createPost,
    post,
    updatePost,
    deletePost,
};