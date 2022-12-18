var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/whoareya', ['players'])


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',(req,res) => {
    let found= false;
    db.users.find({"username": req.body.username, "password": req.body.password},(err, docs) => {
        if (err) {
            res.render('index', { error: 'Las credenciales no son correctas' });
        } else if (docs.length == 0) {
            res.render('index', {error: 'Las credenciales no son correctas'});
            }
            else {
                req.session.userid=req.body.username;
                console.log(req.session)
                res.redirect('/protected');
            }
    })
});


module.exports = router;
