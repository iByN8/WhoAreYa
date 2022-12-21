var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.get('/remove/:id',(req,res,next) => {
    db.players.remove({id: req.params.id},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })
});

router.get('/add',(req,res,next) => {
    res.render('formulario');
});

router.get('/edit/:id',(req,res,next) => {
    db.players.findOne({id: parseInt(req.params.id)},(err, docs) => {
        if (err) {
            res.send(err);
        } else {
           res.render('edit', {element: docs})
            
        }
    })
});

router.put('/:id',function(req, res, next) {
    db.players.findAndModify({
      query: { id: parseInt(req.params.id)}, 
      update: { $set: {"name": req.body.name, "birthdate": req.body.birthdate, "nationality": req.body.nationality, "teamId": req.body.teamId, "position": req.body.position, "number": req.body.number, "leagueId": req.body.leagueId}}},
       (err, result) => {
          if (err) {
              res.send(err)
          } else {
              res.send('Los cambios se han realizado correctamente')
          }
  })
  });


router.get('/:id',(req,res,next) => {
    db.players.findOne({id: parseInt(req.params.id)},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })
});


module.exports = router;
