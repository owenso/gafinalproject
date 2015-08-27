var express = require('express');
var app = express();
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// var flash = require('connect-flash');

var db = require('./config/db');

var port = process.env.PORT || 8080; 
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

app.use(session({
    secret: '6t43regfuyho085y7gihjg08u9eygihj3ygj',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection:db.connection }, function () {
        console.log("db session connection open");
    })
}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash());



app.use(methodOverride('X-HTTP-Method-Override')); 

// routes ==================================================
require('./app/routes')(app);

app.listen(port);

console.log('Magic happens on port ' + port);


module.exports = app;
