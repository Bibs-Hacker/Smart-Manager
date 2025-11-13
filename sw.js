const CACHE_NAME = 'smart-manager-v2';
const urlsToCache = [
  './https://files.catbox.moe/qa99vf.jpg',
  './index.html',
  './manifest.json',
  './https://files.catbox.moe/qa99vf.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch (Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Push Notification Handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Smart Manager Update!',
    icon: './https://files.catbox.moe/qa99vf.jpg',
    badge: './https://files.catbox.moe/qa99vf.jpg',
    vibrate: [100, 50, 100],
    data: { date: new Date().toISOString() },
    actions: [{ action: 'open', title: 'Open App' }]
  };
  event.waitUntil(
    self.registration.showNotification('Smart Manager', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
