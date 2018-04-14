const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const firebase = require('firebase');


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
 } ));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cookieParser());

app.use(flash()); 

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
//



//

require('./app/routes.js')(app, passport);
require('./config/passport')(passport);
app.listen(3000, () => console.log('Server started!'));


