function validate() {
    if (document.myForm.username.value == "") {
        alert("Tên đăng nhập không hợp lệ");
        document.myForm.username.focus();
        return false;
    } else if (document.myForm.username.value.length <= 5) {
        alert("Tên đăng nhập không hợp lệ, phải lớn hơn 5 ký tự");
        document.myForm.username.focus();
        return false;
    }


    if (document.myForm.password.value == "") {
        alert("Nhập mật khẩu");
        document.myForm.password.focus();
        return false;
    } else if (document.myForm.password.value.length <= 6) {
        alert("Mật khẩu không hợp lệ, phải lớn hơn 6 ký tự");
        document.myForm.username.focus();
        return false;
    }

    if (document.myForm.confirm_password.value == "") {
        alert("Nhập xác thực mật khẩu");
        document.myForm.confirm_password.focus();
        return false;
    }

    if (document.myForm.password.value != document.myForm.confirm_password.value) {
        alert("Nhập lại mật khẩu không đúng");
        document.myForm.password.value = '';
        document.myForm.confirm_password.value = '';
        return false;
    }

    if (document.myForm.email.value == "") {
        alert("Email không hợp lệ");
        document.myForm.email.focus();
        return false;
    }

    if (document.myForm.phone_number.value == "" || document.myForm.phone_number.value.length < 10) {
        alert("Số điện thoại không hợp lệ");
        document.myForm.phone_number.focus();
        return false;
    }

    if (document.myForm.address.value == "") {
        alert("Nhập địa chỉ");
        document.myForm.address.focus();
        return false;
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(document.myForm.email.value) == false) 
    {
        alert('Email không hợp lệ');
        document.myForm.email.value = '';
        document.myForm.email.focus();
        return false;
    }

    return true;

}
