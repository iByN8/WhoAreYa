var express = require('express');
var router = express.Router();

// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['users'])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { error: '' });
});

router.post('/register', function(req, res, next){
  db.players.insert({"name": req.body.Nombre, "subname": req.body.Apellidos, "email": req.body.correo, "password": req.body.Contraseña, "rol": "User"}, (err, result) => {
    if (err) {
        res.send(err)
    } else {
        res.redirect('/')
    }
})    
});

router.post('/login', function(req, res, next) { 
  res.redirect('/')
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

