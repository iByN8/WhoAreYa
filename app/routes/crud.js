var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

/* GET home page. */
router.get('/', function(req, res, next) {
    db.players.find((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.render('crud', {elements: docs})
        }
    })
  });


  router.post('/reed', function(req, res, next) {
    res.send(req.body.id)
    //res.redirect('/api/v1/players/'+req.body.id)
  });

  router.post('/edit', function(req, res, next) {
    res.redirect('/api/v1/players/edit/'+req.body.id);
  });

  router.post('/remove', function(req, res, next) {
    res.redirect('/api/v1/players/remove/'+req.body.id);
  });

module.exports = router;