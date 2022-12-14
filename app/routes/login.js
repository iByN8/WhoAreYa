var express = require('express');
var router = express.Router();

// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['users'])

//db.users.insert({name: "Joanes", subname: "Arriola", email: "joanes@email.com", password: "1234", rol: "Admin"})
//db.users.insert({name: "Eneko", subname: "Larruskain", email: "eneko@email.com", password: "1234", rol: "User"})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { error: '' });
});

router.post('/', function(req, res, next) { 
    db.users.findOne({"email": req.body.email, "password": req.body.password},(err, docs) => {
        if (err) {
            res.render('login', { error: 'Las credenciales no son correctas' });
        } else if (docs.length == 0) {
            res.render('login', {error: 'Las credenciales no son correctas'});
            }
            else if (docs.rol == "Admin") {
                req.session.email = req.body.email
                req.session.rol = docs.rol
                res.redirect('/crud')

            }else{
                res.send("Welcome User <a href=\'/login/logout'>click to logout</a>");
            }
    })

  });

  router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/')
  });
  
 
  router.post('/register', function(req, res, next) { 
    res.redirect('/register')
  });

  module.exports = router;