// Retire the former root install. Do not cache or serve the old game offline.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const oldCaches = await caches.keys();
    await Promise.all(oldCaches
      .filter(name => name.startsWith('econ-kids-'))
      .map(name => caches.delete(name)));
    await self.registration.unregister();
  })());
});
