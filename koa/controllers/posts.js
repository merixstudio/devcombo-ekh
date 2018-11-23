const Models = require('../models');

async function posts(ctx) {
    const posts = await Models.PostsModel.findAll();
    ctx.ok(posts);
}

async function createPost(ctx) {
    const bodyContent = ctx.request.body;
    const requestHeaders = ctx.request.header;

    if (requestHeaders['login-token']) {
        const post = await Models.PostsModel.create({
            title: bodyContent.title,
            content: bodyContent.content,
            releasedAt: bodyContent.releasedAt || new Date(),
            authorId: requestHeaders['login-token'],
        });

        ctx.created(post);
    } else {
        ctx.unauthorized();
    }
}

async function post(ctx) {
    const postId = ctx.params.id;
    const post = await Models.PostsModel.findByPk(postId, {
        include: [{
            as: 'author',
            model: Models.UsersModel,
            attributes: ['username', 'id'],
        }],
    });

    ctx.ok(post)
}

async function updatePost(ctx) {
    const bodyContent = ctx.request.body;
    const postId = parseInt(ctx.params.id, 10);
    const requestHeaders = ctx.request.header;

    if (requestHeaders['login-token']) {
        const postUpdated = await Models.PostsModel.update(bodyContent, {
            where: {
                id: postId,
                authorId: requestHeaders['login-token'],
            },
        });

        if (postUpdated[0]) {
            const post = await Models.PostsModel.findByPk(postId);

            ctx.ok(post);
        }
    }

    ctx.unauthorized();
}

async function deletePost(ctx) {
    const postId = parseInt(ctx.params.id, 10);
    const requestHeaders = ctx.request.header;

    if (requestHeaders['login-token']) {
        const deletedPosts = await Models.PostsModel.destroy({
            where: {
                id: postId,
                authorId: requestHeaders['login-token'],
            },
        });

        if (deletedPosts) {
            ctx.noContent();
        } else {
            ctx.notFound();
        }
    } else {
        ctx.unauthorized();
    }
}

module.exports = {
    posts,
    createPost,
    post,
    updatePost,
    deletePost,
};