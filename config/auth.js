var passport = require('passport');

//Dành cho những trang bắt buộc login
exports.checkUserLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isUser(req.account)) {
            items = ['none', '', ''];
            return next();
        }
        req.logout();
        req.flash('loginMessage', 'Tai khoan khong ton tai');
    }
    req.account = "";
    res.redirect('/login');
}

//Dành cho những trang không bắt buộc login
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isUser(req.account)) {
            items = ['none', '', ''];
            return next();
        }
    }
    req.account = "";
    items = ['', 'none', 'none'];
    return next();
}

exports.checkAdminLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isAdmin(req.account)) {
            items = ['none', '', ''];
            return next();
        }
        req.logout();
        req.flash('loginMessage', 'Tai khoan khong ton tai');
    }
    req.account = "";
    res.redirect('/admin/login');
}

function isAdmin(account) {
    if (account.role == "admin") return true;
    else return false;
}

function isUser(account) {
    if (account.role == "user") return true;
    else return false;
}