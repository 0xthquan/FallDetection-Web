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