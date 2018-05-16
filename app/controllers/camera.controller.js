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
        res.redirect("/manage");
    });
}

exports.editCamera = (req, res) => {
    var sql = "select * from camera where id_camera = '" + req.query.id + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/editcamera', { camera: result[0] });
    });
}

exports.updateCamera = (req, res) => {
    var ip = req.body.ip_address;
    var port = req.body.port;
    var description = req.body.description;

    var sql = "update camera set ip_address = ? , port = ? , description = ? where  ?";
    connection.query(sql, [ip, port, description, { id_camera: req.query.id }], (err, result) => {
        if (err) throw err;
        res.redirect("/manage");
    });
}

exports.listUserCamera = (req, res) => {
    var sql = "SELECT use_camera.id_camera, camera.ip_address, camera.port, camera.description FROM camera JOIN use_camera ON camera.id_camera = use_camera.id_camera WHERE use_camera.username = '" + req.account.username + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user/listUserCamera', { account: req.account, show: items, camera: result });
    });
}

exports.watchCamera = (req, res) => {
    var sql = "select * from camera where id_camera = '" + req.query.id + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user/watch', { show: items, account: req.account, camera: result });
    });
}

exports.listAllCamera = (req, res) => {
    var username = req.query.username;
    var sql = "SELECT * FROM camera";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('admin/listAllCamera', { list_camera: result, account_username: username });
    });
}

exports.addCameraByAdmin = (req, res) => {
    var username = req.body.username;
    var id_camera = req.body.id_camera;
    var sql = "insert into use_camera value ( ? , ? ) ";
    connection.query(sql, [username, id_camera], (err, result) => {
        if (err) throw err;
        res.redirect("/manage");
    });
}

exports.addCameraByUserGet = (req, res) => {
    res.render('user/addCameraByUser', { account: req.account, show: items, message: req.flash('addFailed') });
}

exports.addCameraByUserPost = (req, res) => {
    var id_camera = req.body.idCamera.toUpperCase();
    var username = req.account.username;
    sql = "select * from camera where id_camera = ? "
    connection.query(sql, [id_camera], (err, result) => {
        if (err) throw err;
        if (result.length != 0) {
            var sql = "insert into use_camera value ( ? , ? ) ";
            connection.query(sql, [username, id_camera], (err, result) => {
                if (err) throw err;
                res.redirect("/listUserCamera");
            });
        } else {
            req.flash('addFailed', 'ID Camera không hợp lệ');
            res.redirect('/addCameraByUser');
        }
    });

}

exports.deleteCameraByUser = (req, res) => {
    var username = req.account.username;
    var id_camera = req.body.id_camera;
    var sql = 'delete from use_camera where username = ? and id_camera = ? ';
    connection.query(sql, [username, id_camera], (err, result) => {
        if (err) throw err;
        res.redirect("/listUserCamera");
    });
}