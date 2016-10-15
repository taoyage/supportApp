var express = require("express");
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var session = require('express-session');
// var MongoStore = require('connect-mongo/es5')(session);
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var fs = require('fs');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/server/public'));
app.use(logger('dev'));



var settings = require('./server/config/dbConfig');
var io = require('./server/socket/socket')(server);
var routes = require('./server/routes/index')(app);
var teacher_routes = require('./server/routes/teacher')(app); 
// app.use(cookieParser());


// app.use(session({
// 	secret: settings.cookieSecret,
//   key: settings.db,//cookie name
//   cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
//   store: new MongoStore({
//   	url: 'mongodb://localhost/supportApp'
//   }),
//   proxy: true,
//   resave: true,
//   saveUninitialized: true
// }));

server.listen(port);
console.info('Server startup  was successful. \nhttp://127.0.0.1:' + port);
module.exports = app;

