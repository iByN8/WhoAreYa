var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/whoareya', ['players'])


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
