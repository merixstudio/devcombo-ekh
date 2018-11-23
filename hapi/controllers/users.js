const Models = require('../models');

async function users(request, h) {
    return await Models.UsersModel.findAll();
}

async function createUser(request, h) {
    const bodyContent = request.payload;
    const user = await Models.UsersModel.create({
        username: bodyContent.username,
        email: bodyContent.email,
        password: bodyContent.password,
    });

    return h.response(user).code(201);
}

async function user(request, h) {
    const userId = request.params.id;
    const user = await Models.UsersModel.findByPk(userId, {
        include: [{
            as: 'posts',
            model: Models.PostsModel,
        }],
    });

    if (user) {
        return user;
    }

    return h.response('not found').code(404);
}

async function updateUser(request, h) {
    const bodyContent = request.payload;
    const userId = parseInt(request.params.id, 10);
    const userUpdated = await Models.UsersModel.update(bodyContent, { where: { id: userId } });

    if (userUpdated.length) {
        const user = await Models.UsersModel.findByPk(userId);

        return user;
    }

    return h.response('not found').code(404)
}

async function login(request, h) {
    const bodyContent = request.payload;
    const user = await Models.UsersModel.find({
        where: {
            username: bodyContent.username,
            password: bodyContent.password,
        }
    });

    if (user) {
        return { token: user.id };
    }

    return h.response('unauthorized').code(401);
}

module.exports = {
    users,
    createUser,
    user,
    updateUser,
    login,
};