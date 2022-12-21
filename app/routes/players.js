var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.get('/remove/:id',(req,res,next) => {
    if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.remove({id: req.params.id},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })}else{
        res.redirect('/login')
    }
});

router.get('/add',(req,res,next) => {
    if (req.session.email!=null && req.session.rol=="Admin") {
    res.render('formulario');}else{
        res.redirect('/login')
    }
});

router.get('/edit/:id',(req,res,next) => {
    if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.findOne({id: parseInt(req.params.id)},(err, docs) => {
        if (err) {
            res.send(err);
        } else {
           res.render('edit', {element: docs})
            
        }
    })}else{
        res.redirect('/login')
    }
});

router.put('/:id',function(req, res, next) {
    if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.findAndModify({
      query: { id: parseInt(req.params.id)}, 
      update: { $set: {"name": req.body.name, "birthdate": req.body.birthdate, "nationality": req.body.nationality, "teamId": req.body.teamId, "position": req.body.position, "number": req.body.number, "leagueId": req.body.leagueId}}},
       (err, result) => {
          if (err) {
              res.send(err)
          } else {
              res.send('Los cambios se han realizado correctamente')
          }
  })}else{
    res.redirect('/login')
  }
  });


router.get('/:id',(req,res,next) => {
    if (req.session.email!=null && req.session.rol=="Admin") {
    db.players.findOne({id: parseInt(req.params.id)},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })}else{
        res.redirect('/login')
    }
});


module.exports = router;
