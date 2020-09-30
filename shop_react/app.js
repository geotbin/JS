var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');


// connection to the mongo database. shopDB is the current DB (on port 27017)
mongoose.connect('mongodb://localhost:27017/shopDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./model/shop.model');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// --------------
// define routers
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const adminRouter = require('./controllers/shopController');
app.use('/admin', adminRouter);

// error handler
const error = require('./routes/error.js')
app.use(error);

module.exports = app;
