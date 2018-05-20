var user = require('../../app/controllers/user.controller'),
    auth = require('../../config/auth'),
    passport = require('passport');


module.exports = (app) => {
    app.route('/').get(user.index);

    app.route('/login')
        .get(auth.isUserLoggedIn, user.login)
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.route('/logout').get(user.logout);

    app.route('/profile').get(auth.requestUserLogin, user.showProfile);
    
    app.route('/editprofile').get(auth.requestUserLogin, user.editProfile).post(user.updateUser);

    // app.route('/deleteUser').post(user.deleteUser);

    app.route('/saveTokenUserFCM').post(user.saveTokenUserFCM);

    // app.route('/sendFcmNotification').get(user.sendFcmNotification);

}

