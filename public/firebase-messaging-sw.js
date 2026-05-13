// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp(JSON.parse(new URL(location).searchParams.get('firebaseConfig')));

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');
    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;
  // Kep old event data to override
  const oldData = e.data;
  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
        };
        if (newData.notification) {
          newData.data.customNotification = JSON.stringify(newData.notification);
          delete newData.notification;
        }
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  if (payload.data.customNotification) {
    const data = payload.data;
    if (!data || !data.customNotification) {
      return;
    }

    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
      icon: './public/therapee-logo.svg',
      badge: './public/therapee-logo.svg',
      data,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
