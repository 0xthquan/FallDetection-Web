var admin = require('../../app/controllers/admin.controller'),
    auth = require('../../config/auth'),
    passport = require('passport');

    

module.exports = (app) => {
    //Login
    app.route('/admin/login').get(auth.isLoggedIn, admin.login);

    app.route('/admin')
        .get(auth.checkAdminLogin, admin.index)
        .post(passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/admin',
            failureFlash: true
        }));

    // app.route('/admin').get(auth.checkAdminLogin, admin.index);

    app.route('/manage').get(auth.checkAdminLogin, admin.manage);

    app.route('/detailUser').get(auth.checkAdminLogin, admin.detailUser);

    app.route('/editUser').get(auth.checkAdminLogin, admin.editUser).post(admin.updateUser);
    
    app.route('/signUp')
        .get(auth.checkAdminLogin, admin.signUp)
        .post(passport.authenticate('local-signup', {
            successRedirect: '/admin', 
            failureRedirect: '/signup', 
            failureFlash: true 
        })
    );
}

