/* Service worker mínimo: guarda só a "casca" (página e ícones) e SEMPRE busca a página nova.
   Cardápio e pedido nunca vêm de cache (são chamadas ao n8n em outro endereço). */
var CACHE = "pedidos-familiar-casca-1";
var CASCA = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CASCA); }).catch(function () {}));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;   // n8n e outros: direto na rede
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }).then(function (r) {
      var cp = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, cp); }).catch(function () {});
      return r;
    }).catch(function () { return caches.match(e.request); })
  );
});
