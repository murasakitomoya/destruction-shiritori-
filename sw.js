const PREFIX='destruction-shiritori:'+self.registration.scope+':';
const CACHE=PREFIX+'v112';
const FILES=['./destruction_shiritori.html','./manifest.webmanifest','./ds-icon-192-v112.png','./ds-icon-512-v112.png','./ds-favicon-v112.ico'];
const URLS=new Set(FILES.map(f=>new URL(f,self.registration.scope).href));
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);u.search='';if(e.request.method!=='GET'||!URLS.has(u.href))return;e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put(u.href,r.clone())}return r}).catch(()=>caches.open(CACHE).then(c=>c.match(u.href))))});