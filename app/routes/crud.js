var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.find((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.render('crud', {elements: docs})
        }
    })
  }else{
    res.redirect('/login')
  }
  });

module.exports = router;