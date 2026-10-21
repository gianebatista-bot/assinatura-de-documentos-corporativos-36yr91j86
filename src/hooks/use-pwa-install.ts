import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Verificar se já está rodando em modo standalone (PWA instalado)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://')

    if (isStandalone) {
      setIsInstalled(true)
      setIsInstallable(false)
      return
    }

    // Detectar iOS / Safari
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    const isSafari = /safari/.test(userAgent) && !/chrome|crios|firefox|fxios/.test(userAgent)
    if (isIosDevice) {
      setIsIOS(true)
      if (isSafari && !isStandalone) {
        setIsInstallable(true)
      }
    }

    // Capturar o evento padrão beforeinstallprompt do Chrome, Edge, Samsung Internet, etc.
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = async (): Promise<'accepted' | 'dismissed' | 'ios' | 'unsupported'> => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        if (choice.outcome === 'accepted') {
          setIsInstalled(true)
          setIsInstallable(false)
        }
        setDeferredPrompt(null)
        return choice.outcome
      } catch (err) {
        console.error('[PWA] Erro ao disparar prompt:', err)
        return 'unsupported'
      }
    }

    if (isIOS) {
      return 'ios'
    }

    return 'unsupported'
  }

  return {
    isInstallable,
    isInstalled,
    isIOS,
    promptInstall,
    hasNativePrompt: Boolean(deferredPrompt),
  }
}
