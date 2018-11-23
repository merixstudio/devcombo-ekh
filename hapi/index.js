const Hapi = require('hapi');

const routes = require('./routes/index');

const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    routes: {
        cors: true,
    },
});

server.route(routes);

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();