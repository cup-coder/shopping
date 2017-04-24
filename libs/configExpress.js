const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const apiRoutes = require('../routes/api.server.routes');
const apiController = require('../controllers/api.server.controller');

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

    return app;
};

module.exports = creatApp;