var passport = require('passport');

//Dành cho những trang bắt buộc login
exports.requestUserLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isUser(req.account)) {
            return next();
        } else {
            req.logout();
            req.flash('loginMessage', 'Xin vui lòng đăng nhập trước!');
        }
    }
    req.flash('loginMessage', 'Xin vui lòng đăng nhập trước!');
    res.redirect('/login');
}

exports.isUserLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {

        if (isUser(req.account)) {
            // items = ['none', '', ''];
            res.redirect('/profile');
        } else {
            req.logout();
            req.flash('loginMessage', 'Rất tiêc! Trang web không cho phép truy cập đồng thời nhiều tài khoản trên 1 trình duyệt');
            return next();
        }

        // return next();
    } else {
        // req.account = "";
        // items = ['', 'none', 'none'];
        return next();
    }

}

// exports.isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         if (isUser(req.account)) {
//             // items = ['none', '', ''];
//             return next();
//         }
//     }
//     // req.account = "";
//     return next();
// }
//Dành cho những trang không bắt buộc login
exports.requestAdminLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isAdmin(req.account)) {
            // items = ['none', '', ''];
            return next();
        } else {
            req.logout();
            req.flash('loginMessage', 'Tài khoản không hợp lệ');
            res.redirect('/admin/login');
        }

    } else {
        req.flash('loginMessage', 'Xin vui lòng đăng nhập trước!');
        res.redirect('/admin/login');
    }
    // req.account = "";
    // req.flash('loginMessage', 'Tài khoản không hợp lệ');

}

exports.isAdminLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (isAdmin(req.account)) {
            res.redirect('/admin')
        } else {
            req.logout();
            req.flash('loginMessage', 'Rất tiêc! Trang web không cho phép truy cập đồng thời nhiều tài khoản trên 1 trình duyệt');
            return next();
        }

    } else return next();
    // req.account = "";
    // items = ['', 'none', 'none'];

}

function isAdmin(account) {
    if (account.role == "admin") return true;
    else return false;
}

function isUser(account) {
    if (account.role == "user") return true;
    else return false;
}