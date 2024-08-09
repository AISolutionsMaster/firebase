const admin = require('firebase-admin');

let serviceAccount = require('./app-firebase-adminsdk.json'); // Get from firebase console

try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)   
  
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // Handle the error, such as retrying or logging the error details
  }

const messaging = admin.messaging();

async function sendNotification(token, title, body) {
  const message = {
    notification: {
      title: title,
      body: body
    },
    token: token
  };

  try {
    const response = await messaging.send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Example usage:
sendNotification('YOUR FIREBASE TOKEN HERE', 'My Notification', 'Hello from backend!')
  .then(response => {
    console.log('Notification sent successfully:', response);
  })
  .catch(error => {
    console.error('Error sending notification:', error);
  });
