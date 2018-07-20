importScripts('/serviceworker-cache-polyfill.js');

resources = [
    '/',
    '/style.css',
    '/speech-to-text',
    '/speech-to-text/scripts/djSpeechToText.js',
    '/speech-to-text/style.css',
]

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('dakotaJang.github.io').then(function (cache) {
            return cache.addAll(resources);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});