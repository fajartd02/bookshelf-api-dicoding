const hapi = require('@hapi/hapi');

async function init() {
    const server = hapi.server({
        host: 'localhost',
        port: 5000,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.start();
    console.log(`Server is running in ${server.info.uri}`);
}

init();
