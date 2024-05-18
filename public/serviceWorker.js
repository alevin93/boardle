const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// actitivate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // If this is an incoming POST request for the
  // registered "action" URL, respond to it.
  if (event.request.method === 'POST' &&
      url.pathname === '/share-target') {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const text = formData.get('text') || '';
      const submitData = async() => {
        let message = {
          "user" : `${localStorage.getItem('user')}`,
          "data" : `${input}`,
          "date" : `${getDate()}`,
          "comment" : `${comment}`,
        };
        console.log(message);
        const response = await fetch(`${BASE_URL}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(message)
        });
        console.log(response);
        toggleInputSlider();
      }
  
      await submitData().then(res => window.location.reload());
    })());
  }
});

function getDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear(); // Get the full year
  let month = currentDate.getMonth() + 1; // Months are 0-indexed
  if (month < 10) { month = `0${month}`; }
  let day = currentDate.getDate();
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}