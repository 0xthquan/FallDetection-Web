var camera = require('../../app/controllers/camera.controller'),
    auth = require('../../config/auth'),
    passport = require('passport');


module.exports = (app) => {
    app.route('/listUserCamera').get(auth.requestUserLogin, camera.listUserCamera);

    app.route('/watchCamera').get(auth.requestUserLogin, camera.watchCamera);

    app.route('/listAllCamera').get(auth.requestAdminLogin, camera.listAllCamera);

    app.route('/newCamera')
        .get(auth.requestAdminLogin, camera.newCamera)
        .post(camera.insertCamera);

    app.route('/editCamera')
        .get(auth.requestAdminLogin, camera.editCamera)
        .post(camera.updateCamera);

    app.route('/addCameraByAdmin')
        .get(auth.requestAdminLogin, camera.addCameraByAdmin)
        .post(camera.addCameraForUser);

    app.route('/addCameraByUser').post(auth.requestUserLogin, camera.addCameraForUser);

    app.route('/removeCamera').post(camera.removeCamera);

    app.route('/deleteCamera').post(auth.requestAdminLogin, camera.deleteCamera);
}