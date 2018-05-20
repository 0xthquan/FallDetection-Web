function deleteCamera(idCamera){
    if(confirm("Bạn có chắc muốn xóa camera " + idCamera + "?")){
        $.ajax({
            method: "POST",
            url: "/deleteCamera",
            data: { id_camera: idCamera }
        });
        alert("Xóa camera thành công");
        location.reload();
    }
}

function removeCamera(idCamera, username){
    if(confirm("Bạn có chắc muốn xóa camera " + idCamera + "khỏi tài khoản?")){
        $.ajax({
            method: "POST",
            url: "/removeCamera",
            data: { id_camera: idCamera, username: username }
        });
        alert("Xóa camera thành công");
    }
}

function addCameraForUser(username, idCamera){
    if(confirm("Bạn có chắc muốn thêm camera " + idCamera + " cho tài khoản " + username)){
        $.ajax({
            method: "POST",
            url: "/addCameraByAdmin",
            data: { id_camera: idCamera, username: username }
        });
        alert("Thêm thành công");
    }
}

function checkSrcCamera(idCamera){
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
        src: '/images/error_connect_camera.jpg',
    });
    return;
}   