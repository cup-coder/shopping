'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const http = require('http');
const config = require('./libs/config');
const configExpress = require('./libs/configExpress');

function startServer() {
    const app = configExpress(config);
    const port = config.port;
    const server = http.createServer(app);

    server.on('error', error => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = `Port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    server.on('listening', () => {
        const addr = server.address();
        const bind = `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    });

    server.listen(port);
}

if (require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}