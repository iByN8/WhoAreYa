var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('formulario');
});

router.post('/',function(req, res, next) {
  db.players.insert({"id": req.body.id, "name": req.body.name, "birthdate": req.body.birthdate, "nationality": req.body.nationality, "teamId": req.body.teamId, "position": req.body.position, "number": req.body.number, "leagueId": req.body.leagueId}, (err, result) => {
    if (err) {
        res.send(err)
    } else {
        res.send(result)
    }
})
});

module.exports = router;