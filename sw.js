// DNA Kids Lab 서비스 워커: 항상 인터넷의 최신 화면을 먼저 쓰고, 인터넷이 끊겼을 때만 저장해 둔 화면을 보여 줘요.
const CACHE = 'dkl-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'assets/app/icon-192.png', 'assets/img/paper_bg.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (/\.(pdf|mp3|m4a)$/i.test(u.pathname)) return; // 큰 파일은 저장하지 않아요
  e.respondWith(fetch(r).then(res => {
    if (res.ok && res.type === 'basic') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)).catch(() => {}); }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: r.mode === 'navigate' }).then(m => m || (r.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
