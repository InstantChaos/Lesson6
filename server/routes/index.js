//modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user models
let UserModel = require('../models/users');
let User = UserModel.User; //alias for user model object

//define game model
let game = require('../models/games');

//create a function to check if the user is authenticated
function requireAuth(req, res, next){
  //checks if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home'
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact'
   });
});

module.exports = router;
