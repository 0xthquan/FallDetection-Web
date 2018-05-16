messaging.usePublicVapidKey("BG3G3UZVRZVP6ex3rUtweUUXqwV6S_N3AK5ws3isuX7oFU6ohmXr2fMoXOg7NB7qYC7vJmnRmaPwAt7VBrwkosI");
messaging.requestPermission()
    .then(function () {
        console.log('Have permission');
        return messaging.getToken();
    })
    .then(function (token) {
        sendTokenToServer(token);
        console.log(token);

    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    })

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    appendMessage(payload);
    // [END_EXCLUDE]
});

function resetUI() {
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
        .then(function (currentToken) {
            if (currentToken) {
                sendTokenToServer(currentToken);
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        })
        .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
        });
}

function sendTokenToServer(currentToken) {
    $.ajax({
        method: "POST",
        url: "/saveTokenUserFCM",
        data: { tokenDevice: currentToken }
    }).done(function (msg) {
        if (msg == "1") {

        }
    });
}

