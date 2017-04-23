var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/get', function(req, res, next) {
  res.json({msg: 'get test.'})
});

router.post('/post', function(req, res, next) {
  res.json({msg: 'post test.'})
});

module.exports = router;
