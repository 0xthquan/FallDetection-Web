var express = require('express'),
    fs = require('fs'),
    path = require('path');

var connection = require('../config/database.js');
var FCM = require('fcm-push');
var serverKey = "AIzaSyAMBEmcJ-TMH0vhyDgd0yeG-hbeW6xYCeY";
var fcm = new FCM(serverKey);


module.exports = function (app, passport) {

    app.get('/', isLoggedIn2, (req, res, next) => {
        if (isAdmin(req.user)) {
            res.render('admin/index', { show: items, user: req.user });
        } else
            res.render('user/index', { show: items, user: req.user });
    });
    app.get('/profile', isLoggedIn, (req, res) => {
        if (req.user != "") {
            if (isAdmin(req.user)) {
                res.render('admin/index', { show: items, user: req.user });
            } else
                res.render('user/profile', { user: req.user, show: items });
        }

    });

    app.get('/watch', isLoggedIn, (req, res) => {
        console.log(req.query.id);
        var sql = "select * from camera where id_camera = '" + req.query.id + "'";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result.length);
            res.render('user/watch', { show: items, user: req.user, camera: result });
        });

    })

    app.get('/editprofile', isLoggedIn, (req, res) => {
        console.log(req.token);
        res.render('user/editprofile', { show: items, user: req.user });
    })

    app.get('/listcamera', isLoggedIn, (req, res) => {
        var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + req.user.username + "'";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render('user/listcamera', { user: req.user, show: items, camera: result });
        });
    })


    app.get('/login', isLoggedIn2, (req, res) => {
        if (req.user == undefined) {
            req.user = "";
        }
        res.render('user/login', { show: items, message: req.flash('loginMessage'), user: req.user });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/edit', (req, res) => {

        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone_number;
        var address = req.body.address;
        if (req.body.password == undefined || req.body.password == "") {
            var sql = "update user_account set name = ? , email = ? , phone_number = ? , address = ? where  ?";
            connection.query(sql, [name, email, phone, address, { username: req.query.user }], (err, result) => {
                if (err) throw err;
            });
        } else {
            var password = req.body.password;
            var sql = "update user_account set name = ? , password = ? , email = ? , phone_number = ? , address = ? where  ?";
            connection.query(sql, [name, password, email, phone, address, { username: req.query.user }], (err, result) => {
                if (err) throw err;
            });
        }

        var sql = "select * from user_account";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result.length);
            res.render('admin/manage', { list_user: result });
        });
    })



    //ADMIN



    app.get('/manage', (req, res) => {
        var sql = "select * from user_account";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result.length);
            res.render('admin/manage', { list_user: result });
        });

    })

    app.get('/newcamera', (req, res) => {
        res.render('admin/newcamera');
    });

    app.post('/newcamera', (req, res) => {
        var ip = req.body.ip;
        var port = req.body.port;
        var description = req.body.description;
        var sql = "insert into camera(ip_address,port,description) value ( ? , ? , ? ) ";
        connection.query(sql, [ip, port, description], (err, result) => {
            if (err) throw err;
            res.redirect("/manage");
        });
    })

    app.post('/addcamera', (req, res) => {
        var user = req.body.user;
        var id_camera = req.body.id_camera;
        var sql1 = "insert into use_camera value ( ? , ? ) ";
        connection.query(sql1, [user, id_camera], (err, result) => {
            if (err) throw err;
            res.redirect("/manage");
        });

    })

    app.post('/edit_cam', (req, res) => {
        var ip = req.body.ip_address;
        var port = req.body.port;
        var description = req.body.description;

        var sql = "update camera set ip_address = ? , port = ? , description = ? where  ?";
        connection.query(sql, [ip, port, description, { id_camera: req.query.id }], (err, result) => {

            if (err) throw err;
        });
    })

    app.get("/edituser", (req, res) => {
        var sql = "select * from user_account where username = '" + req.query.user + "'";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render('admin/edituser', { user: result[0] });
        });

    })

    app.get("/detail", (req, res) => {
        var user = req.query.user;
        var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + user + "'";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render('admin/detail', { list_camera: result, user: user });
        });

    })

    app.get("/editcamera", (req, res) => {
        var sql = "select * from camera where id_camera = '" + req.query.id + "'";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render('admin/editcamera', { camera: result[0] });
        });
    })

    app.get("/admin/listcamera", (req, res) => {
        var user = req.query.user;
        var sql = "SELECT * FROM camera";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render('admin/listcamera', { list_camera: result, user: user });
        });

    })

    app.get('/signup', function (req, res) {
        res.render('admin/signup', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/manage', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    //Logout

    app.get('/logout', (req, res) => {
        req.logout();
        token = req.session.token;
        var sql = "delete from notification where token = ? " 
        connection.query(sql, [token], (err, result)=>{
            res.redirect('/');
        })
        
    });


    app.get('/sendFcmNotification', function (req, res) {
        var id_camera = req.query.id;

        var sql = "select token from notification join use_camera on notification.username = use_camera.username where ? ";

        connection.query(sql, { id_camera: id_camera }, (err, result) => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
                array[i] = result[i].token;
            }
            console.log(array);

            if (result.length != 0) {

                var message = "Thong bao te nga";
                var title = "PHAT HIEN TE NGA";
                var message = {
                    registration_ids: array,
                    notification: {
                        title: title, //title of notification 
                        body: message, //content of the notification
                        sound: "default",
                        icon: 'fall_detection.png',
                        click_action: "http://localhost:3000/"
                    },
                    // data: data //payload you want to send with your notification
                };

                fcm.send(message, function (err, response) {
                    if (err) {
                        console.log("Notification not sent");
                        console.log(err);
                        res.json({ success: false })
                    } else {
                        console.log("Successfully sent with response: ", response);
                        res.json({ success: true })
                    }
                });
            }


        })




    });

    app.post("/saveTokenUserAPI", (req, res) => {
        req.session.token = req.body.tokenDevice;
        res.send({token: req.session.token})
        saveTokenUserAPI(req.body.tokenDevice, req.body.username);
    })

    function saveTokenUserAPI(input, user) {
        var sql1 = "select token from notification where username = ? and token = ? ";
        connection.query(sql1, [user, input], (err, result) => {
            if (result.length==0) {
                var sql2 = "insert into notification values ( ? , ? ) ";
                connection.query(sql2, [user, input], (err, result) => {
                    if (err) throw err;
                });
            };
        });

    }
};

//Check login
function isLoggedIn(req, res, next) {
    if (req.user == undefined) {
        req.user = "";
    }
    if (req.isAuthenticated()) {
        items = ['none', '', ''];
        return next();
    }
    res.redirect('login');
}

function isLoggedIn2(req, res, next) {
    if (req.user == undefined) {
        req.user = "";
    }
    if (req.isAuthenticated()) {
        items = ['none', '', ''];
        req.user = req.user;
        return next();
    }
    items = ['', 'none', 'none'];
    return next();
}

// function isAdmin(req, res, next) {
//     if(req.isAuthenticated()){
//         if (req.user.role == 'admin') return next();
//     }
//     res.redirect('login');
// }

function isAdmin(user) {
    if (user.role == "admin") {
        return true;
    }
    return false;
}



