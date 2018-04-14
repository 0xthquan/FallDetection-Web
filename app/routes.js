module.exports = function (app, passport) {
    
    app.get('/',isLoggedIn2, (req, res, next) => {
        res.render('index', {show: items});
    });
    app.get('/watch',isLoggedIn , (req, res) => res.render('watch', {user : req.user, show: items}));


    app.get('/login',isLoggedIn2, (req, res) => {
        res.render('login.ejs', { show: items, message: req.flash('loginMessage')  });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/watch',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //Logout

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

//Check login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        items = ['none','',''];
        return next();
    }
    res.redirect('login')
}

function isLoggedIn2(req, res, next) {
    if (req.isAuthenticated()){
        items = ['none','',''];
        return next();
    } 
    items = ['','none','none'];
    return next();

}


