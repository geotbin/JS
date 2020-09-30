const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// connection to database
const dbConnection = require('./controllers/db.js');


// routes
const indexRouter = require('./routes/index');
const error = require('./routes/error');
const books = require('./routes/books');
const bookrest = require('./routes/bookrest');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define the root path for the routes
app.use('/', indexRouter);
app.use('/books', books);
app.use('/bookrest', bookrest);

// error handler
app.use(error);

module.exports = app;
