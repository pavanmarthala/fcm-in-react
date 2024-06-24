import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as getFirebaseToken, onMessage } from 'firebase/messaging';

function App() {
  const [token, setToken] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBdyuuFt-W7WhNQMMvEmxCotZinIGu1N4w",
      authDomain: "dual-app-ecf4d.firebaseapp.com",
      projectId: "dual-app-ecf4d",
      storageBucket: "dual-app-ecf4d.appspot.com",
      messagingSenderId: "708553846451",
      appId: "1:708553846451:web:924f211fd1a2ec44a38ac6"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getFirebaseTokenAndSet();
        } else {
          console.log('Unable to get permission.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    const getFirebaseTokenAndSet = async () => {
      try {
        const currentToken = await getFirebaseToken(messaging);
        if (currentToken) {
          setToken(currentToken);
          console.log('Your FCM token:', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
          await requestPermission();
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    onMessage(messaging, (payload) => {
      console.log('Message received. Payload:', payload);
      const newNotification = {
        title: payload.notification.title,
        body: payload.notification.body,
        timestamp: new Date().toLocaleString()
      };
      setNotifications(prev => [newNotification, ...prev]);
    });

    // Request permission and get token
    requestPermission();

  }, []);

  return (
    <div>
      <h1>Firebase Cloud Messaging</h1>
      {token && <p>Your FCM token: {token}</p>}
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications received yet.</p>
      ) : (
        <ul> 
          {notifications.map((notification, index) => (
            <li key={index}>
              <strong>{notification.title}</strong>
              <p>{notification.body}</p>
              <small>{notification.timestamp}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;