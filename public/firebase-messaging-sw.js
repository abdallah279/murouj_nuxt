importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB708OhVOfUbSGTlXMz8_KMIbNbsVxBC6E",
  authDomain: "murouj-a4aa4.firebaseapp.com",
  projectId: "murouj-a4aa4",
  storageBucket: "murouj-a4aa4.appspot.com",
  messagingSenderId: "258880669628",
  appId: "1:258880669628:web:1ebfa2d2fc8a13d5fc4db9",
  measurementId: "G-LZQ2GT6WVD",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "~/assets/imgs/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
