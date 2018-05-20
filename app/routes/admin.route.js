var admin = require('../../app/controllers/admin.controller'),
    auth = require('../../config/auth'),
    passport = require('passport');

    

module.exports = (app) => {
    //Login
    app.route('/admin/login').get(auth.isAdminLoggedIn, admin.login);

    app.route('/admin')
        .get(auth.requestAdminLogin, admin.index)
        .post(passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/admin',
            failureFlash: true
        }));

    // app.route('/admin').get(auth.requestAdminLogin, admin.index);

    // app.route('/manage').get(auth.requestAdminLogin, admin.manage);

    app.route('/cameraUse').get(auth.requestAdminLogin, admin.cameraUse);

    app.route('/editUser').get(auth.requestAdminLogin, admin.editUser).post(admin.updateUser);
    
    app.route('/deleteUser').post(auth.requestAdminLogin, admin.deleteUser);

    app.route('/adminLogout').get(admin.logout);

    app.route('/signUp')
        .get(auth.requestAdminLogin, admin.signUp)
        .post(passport.authenticate('local-signup', {
            successRedirect: '/admin', 
            failureRedirect: '/signup', 
            failureFlash: true 
        })
    );
}

