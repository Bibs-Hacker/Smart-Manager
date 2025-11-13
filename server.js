const webpush = require('web-push');
const express = require('express');
const app = express();
app.use(express.json());

// VAPID Keys (Replace!)
const vapidKeys = {
  publicKey: 'BA24fohzKN7d9h-uxyStxvvr9vG1uwDUW-N0Vy0Oyh_89So7SnEuz55myuvzHXQm15P5E2Q5O4ZyZd2vON0cfHI',
  privateKey: 'abHzcncrrJ2LPrD0JpiDh52Zq8fMvNdXwMAzUySUYN4'
};
webpush.setVapidDetails('mailto:bridah888@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

// Subscribe Endpoint
app.post('/subscribe', (req, res) => {
  // Save subscription to DB (e.g., array for demo)
  console.log('Subscription:', req.body);
  res.status(201).json({});
});

// Send Push Endpoint
app.post('/send-push', (req, res) => {
  const { title, body, subscription } = req.body;
  webpush.sendNotification(subscription, JSON.stringify({ title, body }))
    .then(() => res.status(200).json({}))
    .catch(err => res.status(500).json({ error: err }));
});

app.listen(3000, () => console.log('Server on port 3000'));
