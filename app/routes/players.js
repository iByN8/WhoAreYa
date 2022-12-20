var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/whoareya', ['players'])

router.get('/remove/:id',(req,res,next) => {
    db.players.remove({_id: mongojs.ObjectId(req.params.id)},(err, docs) => {
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


router.get('/:id',(req,res,next) => {
    db.players.find({id: req.params.id},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })
});


module.exports = router;
