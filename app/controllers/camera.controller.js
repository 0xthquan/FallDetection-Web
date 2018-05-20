var connection = require('../../config/database.js'),
    passport = require('passport');

exports.newCamera = (req, res) => {
    res.render('admin/newCamera');
}

exports.insertCamera = (req, res) => {
    var id = req.body.idCamera.toUpperCase();
    var ip = req.body.ip;
    var port = req.body.port;
    var description = req.body.description;
    var sql = "insert into camera(id_camera,ip_address,port,description) value ( ? , ? , ? , ? ) ";
    connection.query(sql, [id, ip, port, description], (err, result) => {
        if (err) console.log("asdasd");
        res.redirect("/listAllCamera");
    });
}

exports.editCamera = (req, res) => {
    var sql = "select * from camera where id_camera = '" + req.query.id + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/editCamera', { camera: result[0] });
    });
}

exports.updateCamera = (req, res) => {
    var ip = req.body.ip_address;
    var port = req.body.port;
    var description = req.body.description;

    var sql = "update camera set ip_address = ? , port = ? , description = ? where  ?";
    connection.query(sql, [ip, port, description, { id_camera: req.query.id }], (err, result) => {
        if (err) throw err;
        res.redirect("/listAllCamera");
    });
}

exports.listUserCamera = (req, res) => {
    var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + req.account.username + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user/listUserCamera', { account: req.account, camera: result });
    });
}

exports.watchCamera = (req, res) => {
    var sql = "select * from camera where id_camera = '" + req.query.id + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user/watch', {  account: req.account, camera: result });
    });
}

exports.listAllCamera = (req, res) => {
    var sql = "SELECT * FROM camera";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/listAllCamera', { list_camera: result });
    });
}

exports.addCameraByAdmin = (req, res) => {
    var id_camera = req.query.id;
    var sql = "SELECT * FROM account WHERE role = 'user' AND username NOT IN (SELECT username FROM use_camera WHERE id_camera = ? )";
    connection.query(sql,[id_camera], (err, result) => {
        if (err) throw err;
        res.render("admin/addCameraForUser", {list_account: result, id_camera: id_camera});
    });
}

// exports.addCamera = (req, res) => {
//     res.render('user/addCameraForUser', { account: req.account,  message: req.flash('addFailed') });
// }

exports.addCameraForUser = (req, res) => {
    var id_camera = req.body.id_camera.toUpperCase();
    var username;
    if(req.account.role == 'user')  username = req.account.username;
    else username = req.body.username
    sql = "select * from camera where id_camera = ? "
    connection.query(sql, [id_camera], (err, result) => {
        if (err) throw err;
        if (result.length != 0) {
            var sql = "insert into use_camera value ( ? , ? ) ";
            connection.query(sql, [username, id_camera], (err, result) => {
                if (err) {
                    req.flash('addFaild', 'ID Camera không hợp lệ');
                    res.redirect('/profile');
                }
                if(req.account.role == 'user')  res.redirect("/profile");
                else res.redirect("/listAllCamera");
            });
        } else {
            req.flash('addFailed', 'ID Camera không hợp lệ');
            res.redirect('/profile');
        }
    });
}

exports.removeCamera = (req, res) => {
    var username;
    if(req.account.role == 'user') username = req.account.username;
    else username = req.body.username;
    var id_camera = req.body.id_camera;
    var sql = 'delete from use_camera where username = ? and id_camera = ? ';
    connection.query(sql, [username, id_camera], (err, result) => {
        if (err) throw err;
        console.log("xoa dc");
        if(req.account.role == 'admin') res.redirect('/useCamera?username=' + username);
        // res.redirect("/profile");
    });
}

exports.deleteCamera = (req, res) => {
    var id_camera = req.body.id_camera;
    var sql = 'delete from use_camera where id_camera = ? ';
    connection.query(sql, [id_camera], (err, result) => {
        if (err) throw err;
        sql = 'delete from camera where id_camera = ? ';
        connection.query(sql, [id_camera], (err, result) => {
            if (err) throw err;
            res.redirect('/listAllCamera');
        });
        
    });
}