//modules required for the project
let express = require('express');
let path = require('path'); // part of node.js core
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let LocalStrategy = passportlocal.Strategy;
let flash = require('connect-flash'); //displays errors/ login messages


// import "mongoose"
let mongoose = require('mongoose');

// URI
let config = require('./config/db');

mongoose.connect(process.env.URI || config.URI);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Conneced to MongoDB...");
});

//define routers
let index = require('./routes/index'); //top level routes
let games = require('./routes/games'); //routes for games

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

//setup session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));

//initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//route redirect
app.use('/', index);
app.use('/games', games);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
