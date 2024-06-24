importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  // Your Firebase config object
  apiKey: "AIzaSyBdyuuFt-W7WhNQMMvEmxCotZinIGu1N4w",
  authDomain: "dual-app-ecf4d.firebaseapp.com",
  projectId: "dual-app-ecf4d",
  storageBucket: "dual-app-ecf4d.appspot.com",
  messagingSenderId: "708553846451",
  appId: "1:708553846451:web:924f211fd1a2ec44a38ac6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});