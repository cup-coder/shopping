const moment = require('moment');
const Promise = require('bluebird');
const superagent = Promise.promisifyAll(require('superagent'));

module.exports = app => {
    return {
        ping(req, res) {
            res.json({ msg: 'This is the api server for cup-coder.' });
        },
        login(req, res) {
            res.json({ msg: 'You are logining' });
        },
    };
};