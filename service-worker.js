const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

  // tells the service-worker what to do
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('responding with cache : ' + e.request.url)
                return request
            } else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
        })

    )
})

// installing the service-worker
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            // add all the files to the cache storage listener
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// activate service-workers
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (ketList) {
            let cacheKeeplist = ketList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            // add current cache name to the keeplist
            cacheKeeplist.push(CACHE_NAME);

            // method will not return until all promises are fulfilled
            return Promise.all(keyList.map(function (key, i) {
                // returns a -1 if not found in keepList and then it will delete it?
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i] );
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
})