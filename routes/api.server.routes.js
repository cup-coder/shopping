const express = require('express');
const router = express.Router();

module.exports = (app) => {
    const ctrl = app.controllers.apiController;

    router.get('/', ctrl.ping);
    router.get('/login', ctrl.login);

    app.use('/api', router);
};