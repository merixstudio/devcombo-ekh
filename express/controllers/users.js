const Models = require('../models');

async function users(req, res) {
     const users = await Models.UsersModel.findAll();
     return res.send(users);
}

async function createUser(req, res) {
    const bodyContent = req.body;
    const user = await Models.UsersModel.create({
        username: bodyContent.username,
        email: bodyContent.email,
        password: bodyContent.password,
    });

    return res
        .status(201)
        .send(user);
}

async function user(req, res) {
    const userId = req.params.id;
    const user = await Models.UsersModel.findByPk(userId, {
        include: [{
            as: 'posts',
            model: Models.PostsModel,
        }],
    });

    if (user) {
        return res.send(user);
    }

    return res
        .status(404)
        .end();
}

async function updateUser(req, res) {
    const bodyContent = req.body;
    const userId = parseInt(req.params.id, 10);
    const userUpdated = await Models.UsersModel.update(bodyContent, { where: { id: userId } });
    if (userUpdated.length) {
        const user = await Models.UsersModel.findByPk(userId);

        return res.send(user);
    }

    return res
        .status(404)
        .end();
}

async function login(req, res) {
    const bodyContent = req.body;
    const user = await Models.UsersModel.findOne({
        where: {
            username: bodyContent.username,
            password: bodyContent.password,
        }
    });

    if (user) {
        return res.send({ token: user.id });
    }

    return res
        .status(401)
        .end();
}

module.exports = {
    users,
    createUser,
    user,
    updateUser,
    login,
};