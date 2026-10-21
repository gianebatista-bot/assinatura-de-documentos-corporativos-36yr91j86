// PRAFESTA Service Worker - Cache estático, navegação offline e resiliência
const CACHE_NAME = 'prafesta-cache-v1'

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',
  '/icons/apple-touch-icon.png',
  '/offline.html',
]

// Instalação do Service Worker e precache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(PRECACHE_ASSETS)
      } catch (err) {
        console.warn('[PWA SW] Falha parcial no precache inicial:', err)
      }
      return self.skipWaiting()
    }),
  )
})

// Ativação e limpeza de versões antigas do cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Interceptação de requisições de rede
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Apenas métodos GET
  if (request.method !== 'GET') {
    return
  }

  // Ignorar chamadas da API do PocketBase e skip.js para não cachear respostas de autenticação / assinaturas
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('pocketbase') ||
    url.pathname.includes('/skip.js')
  ) {
    return
  }

  // Requisição de Navegação de página (HTML principal)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clona a resposta no cache para a próxima navegação
          if (response && response.status === 200) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(async () => {
          // Se falhou por estar offline, tenta entregar a página em cache ou a tela amigável offline
          const cachedResponse = await caches.match(request)
          if (cachedResponse) {
            return cachedResponse
          }
          const indexResponse = await caches.match('/index.html')
          if (indexResponse) {
            return indexResponse
          }
          const offlinePage = await caches.match('/offline.html')
          if (offlinePage) {
            return offlinePage
          }
          return new Response(
            '<h1>PRAFESTA — Sem Conexão</h1><p>Conecte-se à internet para acessar o portal de assinaturas corporativas.</p>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
          )
        }),
    )
    return
  }

  // Para outros assets estáticos (CSS, JS, WebP, PNG, fontes)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Stale-while-revalidate em segundo plano para manter assets atualizados
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse))
            }
          })
          .catch(() => {
            /* Silently ignore offline network update errors */
          })
        return cachedResponse
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return networkResponse
        })
        .catch(() => {
          // Fallback para imagens
          if (request.destination === 'image') {
            return caches.match('/icons/icon-192x192.png')
          }
        })
    }),
  )
})
