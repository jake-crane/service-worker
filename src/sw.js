self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/js/index.js',
                '/css/style.css'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response !== undefined) {
            return response;
        } else {
            const responseClone = response.clone();
            caches.open('v1').then(function (cache) {
                cache.put(event.request, responseClone);
            });
            return fetch(event.request).then((response) => {
                return response;
            }).catch(e => {
                console.error(e);
            });
        }
    }));
});