const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Log = require('log');
      log = new Log('debug');
const fs = require('fs');
var http = require('http');
var https = require('https');
// var privateKey  = fs.readFileSync(__dirname + '/sslcert/key.pem', 'utf8');
// var certificate = fs.readFileSync(__dirname + '/sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/firebase', express.static(__dirname + '/node_modules/firebase'));
app.use(session({
	secret: 'xxxxxx',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(flash());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());


require('./app/routes.js')(app, passport);
require('./config/passport')(passport);

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080, ()=> log.info('http Server Started 8080'));
// httpsServer.listen(8443, ()=> log.info('https Server Started 8443'));
var port = process.env.PORT;

app.listen(port || 3000, () => console.log('Server started!'));


