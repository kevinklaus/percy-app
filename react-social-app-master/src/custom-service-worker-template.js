if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  //var data = notification.data || {};
  var primaryKey = notification.key;
  console.log('Closed notification: ' + primaryKey);
});
self.addEventListener('notificationclick', function(event) {
  if (!event.action) {
    // Was a normal notification click
    event.notification.close();
    clients.openWindow('/demo');
    return;
  }

  switch (event.action) {
    case 'back-to-app':
      event.notification.close();
      clients.openWindow('/demo');
      break;
    case 'open-group':
      event.notification.close();
      const group = event.notification.actions.find(
        a => a.action === event.action
      ).title;
      console.log(group);
      clients.openWindow(`/groups/${group}/settings`);
      break;
    case 'close':
      event.notification.close();
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});
