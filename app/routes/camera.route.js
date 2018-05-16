var camera = require('../../app/controllers/camera.controller'),
    auth = require('../../config/auth'),
    passport = require('passport');


module.exports = (app) => {
    app.route('/listUserCamera').get(auth.checkUserLogin, camera.listUserCamera);

    app.route('/watchCamera').get(auth.checkUserLogin, camera.watchCamera);

    app.route('/listAllCamera').get(auth.checkAdminLogin, camera.listAllCamera);

    app.route('/newCamera').get(auth.checkAdminLogin, camera.newCamera).post(camera.insertCamera);

    app.route('/editCamera').get(auth.checkAdminLogin, camera.editCamera).post(camera.updateCamera);

    app.route('/addCameraByAdmin').post(auth.checkAdminLogin, camera.addCameraByAdmin);

    app.route('/addCameraByUser')
        .get(auth.checkUserLogin, camera.addCameraByUserGet)
        .post(auth.checkUserLogin, camera.addCameraByUserPost);

    app.route('/deleteCameraByUser').post(auth.checkUserLogin, camera.deleteCameraByUser);
}