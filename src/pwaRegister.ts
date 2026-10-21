/**
 * Registrar o Service Worker PWA para suporte offline e instalabilidade
 */
export function registerPwaServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[PWA] Service Worker registrado com sucesso:', registration.scope)

          // Verifica se há atualização disponível
          registration.onupdatefound = () => {
            const installingWorker = registration.installing
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[PWA] Nova versão disponível do aplicativo PRAFESTA.')
                  } else {
                    console.log('[PWA] Aplicativo pronto para uso offline.')
                  }
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error('[PWA] Erro ao registrar Service Worker:', error)
        })
    })
  }
}
