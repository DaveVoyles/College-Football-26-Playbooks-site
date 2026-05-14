const CACHE_NAME = "cfb26-playbook-v4";
const OFFLINE_URL = "./offline.html";
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./teams.html",
  "./routes.html",
  "./call-sheet.html",
  "./offline.html",
  "./air-raid.html",
  "./pro-style.html",
  "./spread.html",
  "./veer-and-shoot.html",
  "./west-coast.html",
  "./option.html",
  "./run-and-shoot.html",
  "./visualizations/webgl-formations.html",
  "./visualizations/webgl-route-tree.html",
  "./visualizations/webgl-coverage.html",
  "./visualizations/webgl-play-concepts.html",
  "./visualizations/webgl-blitz.html",
  "./visualizations/webgl-run-plays.html",
  "./visualizations/webgl-pre-snap.html",
  "./assets/icons/icon.svg",
  "./assets/scripts/site-nav.js",
  "./assets/scripts/theme.js",
  "./assets/styles/site-nav.css",
  "./assets/styles/theme.css",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_PATHS.map((path) =>
          fetch(new Request(path, { cache: "reload" }))
            .then((response) => {
              if (response && response.ok) {
                return cache.put(path, response.clone());
              }

              return null;
            })
            .catch(() => null)
        )
      ).then(() => self.skipWaiting())
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key)))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          }

          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
