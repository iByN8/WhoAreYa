var express = require('express');
var router = express.Router();

// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['users'])


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { error: '' });
});

router.post('/user', function(req, res, next){
    
});

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.render('index', { error: '' });
});

router.get('/protected',(req,res) => {
  if(req.session.userid){
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else
    res.render('index', { error: '' });
});

module.exports = router;

