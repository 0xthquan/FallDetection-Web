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
