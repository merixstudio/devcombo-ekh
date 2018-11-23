const Models = require('../models');

async function posts(req, res) {
    const posts = await Models.PostsModel.findAll();
    return res.send(posts);
}

async function createPost(req, res) {
    const bodyContent = req.body;
    const loginToken = req.get('login-token');

    if (loginToken) {
        const post = await Models.PostsModel.create({
            title: bodyContent.title,
            content: bodyContent.content,
            releasedAt: bodyContent.releasedAt || new Date(),
            authorId: loginToken,
        });

        if (post) {
            return res.send(post);
        }
    } 
    
    return res
        .status(401)
        .end();    
}

async function post(req, res) {
    const postId = req.params.id;
    const post = await Models.PostsModel.findByPk(postId, {
        include: [{
            as: 'author',
            model: Models.UsersModel,
            attributes: ['username', 'id'],
        }],
    });

    if (post) {
        return res.send(post);
    }

    return res
        .status(404)
        .end();    
}

async function updatePost(req, res) {
    const bodyContent = req.body;
    const postId = parseInt(req.params.id, 10);
    const loginToken = req.get('login-token');

    if (loginToken) {
        const postUpdated = await Models.PostsModel.update(bodyContent, {
            where: {
                id: postId,
                authorId: loginToken,
            },
        });

        if (postUpdated.length) {
            const post = await Models.PostsModel.findByPk(postId);

            return res.send(post);
        }

        return res
            .status(404)
            .end();    
    }

    return res
        .status(401)
        .end();    
}

async function deletePost(req, res) {
    const postId = parseInt(req.params.id, 10);
    const loginToken = req.get('login-token');

    if (loginToken) {
        const deletedPosts = await Models.PostsModel.destroy({
            where: {
                id: postId,
                authorId: loginToken,
            },
        });

        if (deletedPosts) {
            return res
                .status(204)    
                .send(post);
        }

        return res
            .status(404)
            .end();        
    }

    return res
        .status(401)
        .end(); 
}

module.exports = {
    posts,
    createPost,
    post,
    updatePost,
    deletePost,
};