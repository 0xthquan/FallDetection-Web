

var LocalStrategy = require('passport-local').Strategy;

var connection = require('../config/database');

module.exports = function (passport) {
    var sql = '';

    passport.serializeUser((user, done) => {
        done(null, user.username);
        // console.log(user.username);
    })

    passport.deserializeUser((username, done) => {
        sql = 'select * from user_account where username = "' + username + '"';
        connection.query(sql, (err, rows) => {
            done(err, rows[0]);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            sql = 'select * from user_account where username = "' + username + '"';
            connection.query(sql, (err, rows) => {
                if (err) return done(err);

                if (!rows.length)
                    return done(null, false, req.flash('loginMessage', 'User is not exist!'));

                if (rows[0].password != password)
                    return done(null, false, req.flash('loginMessage', 'Wrong password!'));

                return done(null, rows[0]);
            });
        }));

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {
            var role = req.body.role;
            var name = req.body.name;
            var email = req.body.email;
            var phone = req.body.phone_number;
            var address = req.body.address;
            var register_date = req.body.register_date;
            connection.query("SELECT * FROM user_account WHERE username = ?", [username], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    connection.query("SELECT * FROM user_account WHERE email = ?", [email], function (err, rows) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                            return done(null, false, req.flash('signupMessage', 'That email is already used.'));
                        } else {
                            var newUser = {
                                username: username,
                                password: password,
                                role: role,
                                name: name,
                                email: email,
                                phone_number: phone,
                                address: address,
                                register_date: register_date
                            };
                            var insertQuery = "INSERT INTO user_account (username, password, role, name, email, phone_number, address, register_date) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? )";
                            connection.query(insertQuery, [newUser.username, newUser.password, newUser.role, newUser.name, newUser.email, newUser.phone_number, newUser.address, newUser.register_date], function (err, rows) {
                                if(err) return done(err);
                                return done(null);                             
                            });
                        }
                    });
                }
            });
        })
    );


}