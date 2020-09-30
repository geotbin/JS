const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// to handle CORS
const cors = require('cors');

// define routers
const indexRouter = require('./routes/index');
const rulesRouter = require('./routes/rules');
const playRouter = require('./routes/play');
const aboutRouter = require('./routes/about');
const error = require('./routes/error');

var app = express();

// install cors middleware to enable cross-origin request
app.use(cors());
// you can define a specific middleware too:
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");                             // from all origins
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");       // from a specific origin, here localhost
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// install routers as middlewares for their root path
app.use('/', indexRouter);
app.use('/rules', rulesRouter);
app.use('/about', aboutRouter);
app.use('/play', playRouter);

// in all other cases use error route
app.use(error);


module.exports = app;
