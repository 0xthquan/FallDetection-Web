var express = require('./config/express');
var passport = require('./config/passport');


var app = express();
var passport = passport();
var port = process.env.PORT;

app.listen(port || 3000, () => console.log('Server started!'));


