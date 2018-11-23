const Models = require('../models');

async function users(ctx) {
    const users = await Models.UsersModel.findAll();
    ctx.ok(users);
}

async function createUser(ctx) {
    const bodyContent = ctx.request.body;
    const user = await Models.UsersModel.create({
        username: bodyContent.username,
        email: bodyContent.email,
        password: bodyContent.password,
    });

    ctx.created(user);
}

async function user(ctx) {
    const userId = ctx.params.id;
    const user = await Models.UsersModel.findByPk(userId, {
        include: [{
            as: 'posts',
            model: Models.PostsModel,
        }],
    });
    ctx.ok(user)
}

async function updateUser(ctx) {
    const bodyContent = ctx.request.body;
    const userId = parseInt(ctx.params.id, 10);
    await Models.UsersModel.update(bodyContent, { where: { id: userId } });
    const user = await Models.UsersModel.findByPk(userId);
    ctx.ok(user);
}

async function login(ctx) {
    const bodyContent = ctx.request.body;
    const user = await Models.UsersModel.find({
        where: {
            username: bodyContent.username,
            password: bodyContent.password,
        }
    });

    if (user) {
        ctx.ok({ token: user.id });
    } else {
        ctx.unauthorized();
    }
}

module.exports = {
    users,
    createUser,
    user,
    updateUser,
    login,
};