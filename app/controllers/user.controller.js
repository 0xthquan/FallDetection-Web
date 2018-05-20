var connection = require('../../config/database.js');
var passport = require('passport');
var auth = require('../../config/auth');

// var FCM = require('fcm-push');
// var serverKey = "AIzaSyAMBEmcJ-TMH0vhyDgd0yeG-hbeW6xYCeY";
// var fcm = new FCM(serverKey);

exports.index = (req, res, next) => {
    res.render('user/index', { account: req.account });
}

exports.showProfile = (req, res) => {
    var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + req.account.username + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user/profile', { account: req.account, list_camera: result, message: req.flash('addFailed') });
    });
}

exports.login = (req, res) => {
    // if (req.account == undefined) {
    //     req.account = "";
    // }
    res.render('user/login', {  message: req.flash('loginMessage'), account: req.account });
}

exports.logout = (req, res) => {
    req.logout();
    var token = req.session.token;
    var sql = "delete from notification where token = ? "
    connection.query(sql, [token], (err, result) => {
        res.redirect('/');
    })
}

exports.editProfile = (req, res) => {
    res.render('user/editprofile', { account: req.account });
}

exports.updateUser = (req, res) => {
    var username = req.account.username;

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone_number;
    var address = req.body.address;
    var password = req.body.password;

    if (password == undefined || password == "") {
        var sql = "update account set name = ? , email = ? , phone_number = ? , address = ? where  username = ? ";
        connection.query(sql, [name, email, phone, address, username], (err, result) => {
            if (err) throw err;
        });
    } else {
        var sql = "update account set password = ? where username = ? ";
        connection.query(sql, [password, username], (err, result) => {
            if (err) throw err;
        });
    }

    res.redirect('/profile');
}

// exports.deleteUser = (req, res) => {
//     var username = req.body.username
//     var sql = "select * from account where username = ? "
//     connection.query(sql, [username], (err, result) => {
//         if (result[0].role != 'admin') {
//             sql = "delete from notification where username = ? "
//             connection.query(sql, [username], (err, result) => {
//                 if (err) throw err;
//                 sql = "delete from use_camera where username = ? "
//                 connection.query(sql, [username], (err, result) => {
//                     if (err) throw err;
//                     sql = "delete from account where username = ? "
//                     connection.query(sql, [username], (err, result) => {
//                         if (err) throw err;
//                         res.redirect('/manage');
//                     });
//                 });
//             });
//         } else {
//             res.redirect('/admin');
//         }
//     })
// }

exports.saveTokenUserFCM = (req, res) => {
    req.session.token = req.body.tokenDevice;
    res.send({ token: req.session.token })
    var token = req.body.tokenDevice;
    var username = req.account.username

    var sql = "select * from use_camera where username = ? ";
    connection.query(sql, [username], (err, result) => {
        if (result.length != 0) {
            sql = "select token from notification where username = ? and token = ? ";
            connection.query(sql, [username, token], (err, result) => {
                if (result.length == 0) {
                    sql = "insert into notification values ( ? , ? ) ";
                    connection.query(sql, [username, token], (err, result) => {
                        if (err) throw err;
                    });
                };
            });
        };
    });

}
