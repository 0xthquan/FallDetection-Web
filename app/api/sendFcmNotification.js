var connection = require('../../config/database.js');
var FCM = require('fcm-push');
var serverKey = "AIzaSyAMBEmcJ-TMH0vhyDgd0yeG-hbeW6xYCeY";
var fcm = new FCM(serverKey);

module.exports = (app) => {
    app.route('/api/sendFcmNotification/:id').get((req, res) => {
        var id_camera = req.params.id;

        var sql = "select token from notification join use_camera on notification.username = use_camera.username where ? ";

        connection.query(sql, { id_camera: id_camera }, (err, result) => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
                array[i] = result[i].token;
            }
            console.log(array);

            if (result.length != 0) {

                var message = "Thong bao te nga";
                var title = "PHAT HIEN TE NGA";
                var message = {
                    registration_ids: array,
                    notification: {
                        title: title, //title of notification 
                        body: message, //content of the notification
                        sound: "default",
                        icon: 'img/fall_detection.png',
                        click_action: "http://localhost:3000/"
                    },
                    // data: data //payload you want to send with your notification
                };

                fcm.send(message, function (err, response) {
                    if (err) {
                        console.log("Notification not sent");
                        console.log(err);
                        res.json({ success: false })
                    } else {
                        console.log("Successfully sent with response: ", response);
                        res.json({ success: true })
                    }
                });
            }
        })
    }
    );
}