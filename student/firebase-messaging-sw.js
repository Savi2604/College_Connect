// Version 10 Compat libraries use pannanum (Mukkiam!)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAZOJh_a5oDaKluV3IU6Ly2o7PlTlSEbhQ",
    authDomain: "college-connect-2cd42.firebaseapp.com",
    databaseURL: "https://college-connect-2cd42-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "college-connect-2cd42",
    storageBucket: "college-connect-2cd42.firebasestorage.app",
    messagingSenderId: "16394931571",
    appId: "1:16394931571:web:38b8abc12ec26d7dc50906"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Notification Handle
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message received:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/College-Connect/student/firebase-logo.png' // Icon path check pannikonga
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});