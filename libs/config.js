'use strict'
const env = process.env.NODE_ENV;
let config = require('../env/development.js');
if (env) {
    config = require(`../env/${env}.js`);
}

module.exports = config;