var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 7777,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_falldetection'
    
});

connection.connect();

module.exports = function (passport) {
    var sql = '';

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        sql = 'select * from user_account where id = '+id;
        connection.query(sql, (err,rows)=>{
            done(err, rows[0]);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        sql = 'select * from user_account where username = "'+username +'"';
        connection.query(sql, (err,rows) => {
            if(err) return done(err);

            if(!rows.length) 
                return done(null, false, req.flash('loginMessage', 'User is not exist!'));

            if(rows[0].password != password) 
                return done(null, false, req.flash('loginMessage', 'Wrong password!'));

            return done(null, rows[0]);
        });
    }));

}