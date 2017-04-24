const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const apiRoutes = require('../routes/api.server.routes');
const apiController = require('../controllers/api.server.controller');

const pathSet = new Set([
    '/',
    '/login',
]);

function creatApp(config) {
    const app = express();
    app.set('json spaces', 4);
    app.use(morgan('short'));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json({ limit: '80mb' }));
    app.use(bodyParser.raw());
    app.libs = {
        config,
    };
    app.controllers = {
        apiController: apiController(app),
    };

    apiRoutes(app);

    app.use((req, res, next) => {
        if (req.method === 'GET' && pathSet.has(req.path)) {
            res.json({
                code: 0,
                msg: "Sorry, request not exist."
            });
        } else {
            next();
        }
    });
    return app;
};

module.exports = creatApp;