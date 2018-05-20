$(document).ready(function () {
    var reloading = sessionStorage.getItem("removeDone");
    if (reloading) {
        sessionStorage.removeItem("removeDone");
        afterRemoveCamera();
    } else {
        var navItems = $('.admin-menu li > a');
        var navListItems = $('.admin-menu li');
        var allWells = $('.admin-content');
        // var allWellsExceptFirst = $('.admin-content:not(:first)');
        // allWellsExceptFirst.hide();
        navItems.click(function (e) {
            e.preventDefault();
            navListItems.removeClass('active');
            $(this).closest('li').addClass('active');
            allWells.hide();
            var target = $(this).attr('data-target-id');
            $('#' + target).show();
        });
    }

});


function changeContent(idContent) {
    var allWells = $('.admin-content');
    $(this).closest('li').addClass('active');
    allWells.hide();
    $(idContent).show();
}


function removeCamera(currentCamera) {
    if(confirm("Bạn có chắc muốn xóa camera " + currentCamera + " khỏi tài khoản?")){
        $.ajax({
            method: "POST",
            url: "/removeCamera",
            data: { id_camera: currentCamera }
        });
        alert("Xóa camera thành công");
        sessionStorage.setItem("removeDone", "true");
        location.reload();
    }
   
    // var navListItems = $('.admin-menu li');
    // navListItems.removeClass('active');
    // var allWells = $('.admin-content');
    // $("#camera").addClass('active');
    // allWells.hide();
    // $('#manage-camera').show();
}

// window.onload = function () {
//     var reloading = sessionStorage.getItem("reloading");
//     if (reloading) {
//         sessionStorage.removeItem("reloading");
//         afterDeleteCamera();
//     }
// }

// hanh dong sau khi xoa
function afterRemoveCamera() {
    var navListItems = $('.admin-menu li');
    navListItems.removeClass('active');
    var allWells = $('.admin-content');
    $("#camera").addClass('active');
    allWells.hide();
    $('#manage-camera').show();
}


function checkSourceCamera(idCamera){
    var srcCamera = $('#'+ idCamera).attr('src');
    console.log(srcCamera);
    // $.ajax({
    //     url: "test.html",
    //     error: function(){
    //         // will fire when timeout is reached
    //     },
    //     success: function(){
    //         //do something
    //     },
    //     timeout: 3000 // sets timeout to 3 seconds
    // });
    $('#'+ idCamera + '.source-camera').attr({
        src: 'https://1.bp.blogspot.com/-kIqg5TxoHig/U2XtDcqs2GI/AAAAAAAABm0/3RkvyIHi20A/s1600/there-is-no-connected-camera-mac.jpg',
    });
    return;
}   

function validateForm() {
    if (document.myForm.password.value == "") {
        alert("Nhập mật khẩu");
        document.myForm.password.focus();
        return false;
    } else if (document.myForm.password.value.length <= 6) {
        alert("Mật khẩu không hợp lệ, phải lớn hơn 6 ký tự");
        document.myForm.password.focus();
        return false;
    }


    if (document.myForm.username.value == "") {
        alert("Tên đăng nhập không hợp lệ");
        document.myForm.username.focus();
        return false;
    } else if (document.myForm.username.value.length <= 5) {
        alert("Tên đăng nhập không hợp lệ, phải lớn hơn 5 ký tự");
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

    if (reg.test(document.myForm.email.value) == false) {
        alert('Email không hợp lệ');
        document.myForm.email.value = '';
        document.myForm.email.focus();
        return false;
    }

    return true;

};