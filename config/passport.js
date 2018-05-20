var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var connection = require('../config/database');

module.exports =  () => {
    var sql = '';

    passport.serializeUser((account, done) => {
        done(null, account.username);
        // console.log(user.username);
    })

    passport.deserializeUser((username, done) => {
        sql = 'select * from account where username = "' + username + '"';
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
            sql = 'select * from account where username = "' + username + '"';
            connection.query(sql, (err, rows) => {
                if (err) return done(err);

                if (!rows.length)
                    return done(null, false, req.flash('loginMessage', 'Tài khoản không hợp lệ'));

                if (rows[0].password != password)
                    return done(null, false, req.flash('loginMessage', 'Tài khoản không hợp lệ'));
                return done(null, rows[0]);
            });
        }));

    passport.use('local-signup', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            var role = req.body.role;
            var name = req.body.name;
            var email = req.body.email;
            var phone = req.body.phone_number;
            var address = req.body.address;
            var register_date = req.body.register_date;
            connection.query("SELECT * FROM account WHERE username = ?", [username], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    connection.query("SELECT * FROM account WHERE email = ?", [email], function (err, rows) {
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
                            var insertQuery = "INSERT INTO account (username, password, role, name, email, phone_number, address, register_date) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? )";
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