importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js');
importScripts('/firebase/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyBlbaG62tmfGjS0HaBU279JIPFjs277NnE",
  authDomain: "fall-detection-datn.firebaseapp.com",
  databaseURL: "https://fall-detection-datn.firebaseio.com",
  projectId: "fall-detection-datn",
  storageBucket: "fall-detection-datn.appspot.com",
  messagingSenderId: "675417404598"
};
firebase.initializeApp(config);
var messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'This is message';
  var notificationOptions = {
    body: 'Fall detection.',
    icon: 'fall_detection.png',
    sound: "default",
  };
  
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  console.log('OK')
  var url = "http://localhost:3000/watch";
  event.waitUntil(
      clients.matchAll({
              type: 'window'
          })
          .then(function(windowClients) {
              for (var i = 0; i < windowClients.length; i++) {
                  var client = windowClients[i];
                  if (client.url === url && 'focus' in client) {
                      return client.focus();
                  }
              }
              if (clients.openWindow) {
                  return clients.openWindow(url);
              }
          })
  );
});