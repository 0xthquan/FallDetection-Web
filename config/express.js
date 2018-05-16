const express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    Log = require('log'),
    log = new Log('debug');


module.exports = () => {
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(express.static('./public'));

    app.use('/js', express.static('./node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/js', express.static('./node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/css', express.static('./node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
    app.use('/firebase', express.static('./node_modules/firebase'));

    app.use(session({
        secret: 'xxxxxx',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: null,
        }
    }));
    app.use(passport.initialize({ userProperty: 'account' }));
    app.use(passport.session());
    app.use(cookieParser());

    app.use(flash());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    require('../app/routes/user.route.js')(app);
    require('../app/routes/admin.route.js')(app);
    require('../app/routes/camera.route.js')(app);
    require('../app/api/sendFcmNotification.js')(app);
    // require('../app/routes.js')(app, passport);

    return app;
}