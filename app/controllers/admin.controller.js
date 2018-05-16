var connection = require('../../config/database.js');
var passport = require('passport');
var auth = require('../../config/auth');

exports.login = (req, res) => {
    if (req.account == undefined) {
        req.account = "";
    }
    res.render('admin/login', { show: items, message: req.flash('loginMessage'), account: req.account });
}

exports.index = (req, res, next) => {
    res.render('admin/index', { show: items, account: req.account });
};

exports.manage = (req, res) => {
    var sql = "select * from account";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.length);
        res.render('admin/manage', { list_account: result });
    });
}

exports.detailUser = (req, res) => {
    var username = req.query.username;
    var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + username + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/detail', { list_camera: result, account_name: username });
    });

}

exports.editUser = (req, res) => {
    var username = req.query.username;
    var sql = "select * from account where username = '" + username + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/edituser', { account: result[0] });
    });
}

exports.updateUser = (req, res) => {
    var username = req.query.username;

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone_number;
    var address = req.body.address;

    if (req.body.password == undefined || req.body.password == "") {
        var sql = "update account set name = ? , email = ? , phone_number = ? , address = ? where username = ? ";
        connection.query(sql, [name, email, phone, address, username], (err, result) => {
            if (err) throw err;
        });
    } else {
        var password = req.body.password;
        var sql = "update account set name = ? , password = ? , email = ? , phone_number = ? , address = ? where username = ? ";
        connection.query(sql, [name, password, email, phone, address, username], (err, result) => {
            if (err) throw err;
        });
    }

    res.redirect('manage')
}

exports.signUp = (req, res) => {
    res.render('admin/signup', { message: req.flash('signupMessage') });
}