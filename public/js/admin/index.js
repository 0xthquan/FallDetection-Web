function deleteUser(username) {
    if (confirm("Bạn có chắc muốn xóa người dùng " + username + "?")) {
        $.ajax({
            method: "POST",
            url: "/deleteUser",
            data: { username: username }
        });
        alert("Xóa người dùng thành công");
    }
}
