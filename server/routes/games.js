let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let game = require('../models/games');

/* GET games list page. READ*/
router.get('/', (req, res, next) => {
  // find all games in the games collection
  game.find((err, games) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });
    }

  });
  
});

//GET the games details page in order to add a new game
router.get('/add', (req,res,next) => {
    res.render('games/details', {
        title: "Add a new Game",
        games: ''
    });
});

//POST process the details page in order to add a new game CREATE
router.post('/add', (req,res,next) => {

    let newGame = game({
        "name": req.body.name,
        "cost": req.body.cost,
        "rating": req.body.rating
    });

    game.create(newGame, (err, games) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/games');
        }
    });
});

//GET game details page in order to edit the game
router.get('/:id', (req,res,next)=>{
    //get a reference to the id fomr the url
    let id = req.params.id;

    //find one game by its id
    game.findById(id,(err, games)=>{
        if(err){
            console.log(err);
            res.end(error);
        }else{
            //show the game details view
            res.render('games/details', {
                title: 'Games Details',
                games: games
            })
        }
    });
});

// POST - process the information passed from the details from and update
router.post('/:id', (req,res,next)=>{
    let id = req.params.id;

    let updatedGame = game({
        "_id": id,
        "name": req.body.name,
        "cost": req.body.cost,
        "rating": req.body.rating
    });

    game.update({_id: id }, updatedGame, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //refresh the games list
            res.redirect('/games');
        }
    });

});

//GET - process the delete by user id
router.get('/delete/:id', (req,res,next) =>{
    let id = req.params.id;

    game.remove({_id: id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //refresh the games list
            res.redirect('/games');
        }
    });
});

module.exports = router;