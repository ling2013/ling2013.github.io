self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v3').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/image-list.js',
        '/star-wars-logo.jpg',
        '/gallery/bountyHunters.jpg',
        '/gallery/myLittleVader.jpg',
        '/gallery/snowTroopers.jpg',
        '/logo.ico',
        '/logo.svg',
        '/logo.png',
        '/logo.webp',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v3').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/gallery/myLittleVader.jpg');
      });
    }
  }));
});


self.addEventListener('notificationclick', function(event) {
    // 关闭当前的弹窗
    event.notification.close();
    // 在新窗口打开页面
    event.waitUntil(
        clients.openWindow('https://baidu.com')
    );
});


self.addEventListener('push', function(event) {
    const title = event.data.text();
    const options = {
        body: event.data.text(),
        icon: './logo.png',
    };

    event.waitUntil(self.registration.showNotification(title, options));
})
  self.registration.showNotification('您有新消息', {
      body: 'Hello Service Worker',
      icon: './logo.png',});
