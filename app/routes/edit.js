var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.post('/:id',function(req, res, next) {
    if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.findAndModify({
      query: { id: parseInt(req.params.id)}, 
      update: { $set: {"name": req.body.name, "birthdate": req.body.birthdate, "nationality": req.body.nationality, "teamId": req.body.teamId, "position": req.body.position, "number": req.body.number, "leagueId": req.body.leagueId}}},
       (err, result) => {
          if (err) {
              res.send(err)
          } else {
              res.redirect('/crud')
          }
  })}else{
    res.redirect('/login')
  }
  });




module.exports = router;