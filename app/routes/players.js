var express = require('express');
var router = express.Router();


// MongoDB
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/whoareya', ['players'])




router.get('/',(req,res,next) => {
    db.players.find({_id: mongojs.ObjectId(id)},(err, docs) => {
        if (err) {
            res.render('index', { error: 'No existe ningun jugador con ese ID' });
        } else{
            res.send(docs);
        }
    })
});


module.exports = router;
