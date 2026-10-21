import React, { useState } from 'react'
import { usePwaInstall } from '@/hooks/use-pwa-install'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Download, Share, PlusSquare, Smartphone, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import prafestaLogo from '@/assets/logo.582f8581-2-88ba8.webp'

interface InstallAppButtonProps {
  variant?: 'login' | 'navbar' | 'compact'
  className?: string
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, promptInstall, hasNativePrompt } = usePwaInstall()
  const [iosModalOpen, setIosModalOpen] = useState(false)
  const [genericModalOpen, setGenericModalOpen] = useState(false)

  // Se já está instalado como standalone, não precisa exibir
  if (isInstalled) {
    return null
  }

  const handleInstallClick = async () => {
    if (hasNativePrompt) {
      const outcome = await promptInstall()
      if (outcome === 'accepted') {
        toast.success('Aplicativo PRAFESTA instalado com sucesso na sua área de trabalho!')
      }
    } else if (isIOS) {
      setIosModalOpen(true)
    } else {
      setGenericModalOpen(true)
    }
  }

  // Estilo visual conforme a variante
  if (variant === 'login') {
    return (
      <>
        <div className={`pt-3 text-center ${className}`}>
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-2 text-xs font-medium text-rose-300 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-rose-400" />
            <span>Instalar aplicativo PRAFESTA</span>
          </button>
        </div>

        {/* Modal Instruções iOS */}
        <Dialog open={iosModalOpen} onOpenChange={setIosModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-xl border border-rose-100 flex items-center justify-center">
                  <img src={prafestaLogo} alt="PRAFESTA" className="h-6 w-auto object-contain" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-white">
                    Instalar aplicativo no iPhone/iPad
                  </DialogTitle>
                  <p className="text-xs text-rose-400 font-semibold">Portal PRAFESTA</p>
                </div>
              </div>
              <DialogDescription className="text-slate-300 text-xs">
                Para ter o ícone do aplicativo na tela inicial do seu dispositivo Apple, siga os
                passos abaixo no Safari:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs text-slate-200">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="p-1.5 bg-rose-600/30 text-rose-400 rounded-md">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">1. Toque no botão Compartilhar</div>
                  <div className="text-slate-400 text-[11px]">
                    Localizado na barra de ferramentas inferior do Safari no iPhone (ou superior no
                    iPad).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="p-1.5 bg-rose-600/30 text-rose-400 rounded-md">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    2. Selecione "Adicionar à Tela de Início"
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Role a lista de ações para baixo até encontrar a opção.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="p-1.5 bg-emerald-600/30 text-emerald-400 rounded-md">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">3. Confirme em "Adicionar"</div>
                  <div className="text-slate-400 text-[11px]">
                    O ícone oficial da PRAFESTA será fixado na sua tela inicial para acesso rápido!
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setIosModalOpen(false)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs mt-2"
            >
              Entendi
            </Button>
          </DialogContent>
        </Dialog>

        {/* Modal Instruções Gerais (quando navegador desktop ou sem evento direto) */}
        <Dialog open={genericModalOpen} onOpenChange={setGenericModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-xl border border-rose-100 flex items-center justify-center">
                  <img src={prafestaLogo} alt="PRAFESTA" className="h-6 w-auto object-contain" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-white">
                    Como instalar o aplicativo PRAFESTA
                  </DialogTitle>
                  <p className="text-xs text-rose-400 font-semibold">Instalação PWA</p>
                </div>
              </div>
              <DialogDescription className="text-slate-300 text-xs">
                O portal corporativo PRAFESTA pode ser instalado diretamente no seu computador ou
                celular para acesso rápido em tela inteira:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2.5 py-2 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
                <strong className="text-white block mb-1">No Google Chrome / Edge:</strong>
                Clique no ícone de computador/instalação{' '}
                <Download className="w-3.5 h-3.5 inline text-rose-400 mx-0.5" /> que aparece no
                canto direito da barra de endereços (URL) e confirme "Instalar".
              </div>
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
                <strong className="text-white block mb-1">No Android:</strong>
                Toque no menu de três pontos do navegador e escolha "Adicionar à tela inicial" ou
                "Instalar aplicativo".
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setGenericModalOpen(false)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs mt-2"
            >
              Fechar
            </Button>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Variante Navbar
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleInstallClick}
        className={`text-slate-300 hover:text-white hover:bg-slate-800 text-xs gap-1.5 ${className}`}
        title="Instalar aplicativo no seu dispositivo"
      >
        <Download className="w-4 h-4 text-rose-400" />
        <span className="hidden md:inline">Instalar App</span>
      </Button>

      {/* Modal Instruções iOS */}
      <Dialog open={iosModalOpen} onOpenChange={setIosModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-xl border border-rose-100 flex items-center justify-center">
                <img src={prafestaLogo} alt="PRAFESTA" className="h-6 w-auto object-contain" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-white">
                  Instalar aplicativo no iPhone/iPad
                </DialogTitle>
                <p className="text-xs text-rose-400 font-semibold">Portal PRAFESTA</p>
              </div>
            </div>
            <DialogDescription className="text-slate-300 text-xs">
              Para instalar este aplicativo no seu iOS, abra no Safari e siga:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs text-slate-200">
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="p-1.5 bg-rose-600/30 text-rose-400 rounded-md">
                <Share className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">1. Toque em Compartilhar</div>
                <div className="text-slate-400 text-[11px]">Ícone na barra de menu do Safari.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="p-1.5 bg-rose-600/30 text-rose-400 rounded-md">
                <PlusSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">2. "Adicionar à Tela de Início"</div>
                <div className="text-slate-400 text-[11px]">
                  Role a lista e selecione esta opção.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="p-1.5 bg-emerald-600/30 text-emerald-400 rounded-md">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">3. Toque em Adicionar</div>
                <div className="text-slate-400 text-[11px]">
                  Pronto! O app aparecerá junto com seus outros aplicativos.
                </div>
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setIosModalOpen(false)}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs mt-2"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal Geral */}
      <Dialog open={genericModalOpen} onOpenChange={setGenericModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-xl border border-rose-100 flex items-center justify-center">
                <img src={prafestaLogo} alt="PRAFESTA" className="h-6 w-auto object-contain" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-white">
                  Instalar aplicativo PRAFESTA
                </DialogTitle>
                <p className="text-xs text-rose-400 font-semibold">Portal Corporativo</p>
              </div>
            </div>
            <DialogDescription className="text-slate-300 text-xs">
              Instale o aplicativo para abri-lo direto da sua área de trabalho ou celular:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 py-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
              <strong className="text-white block mb-1">No navegador do computador:</strong>
              Procure pelo botão de instalação na barra de navegação superior ou de endereço do
              Chrome/Edge.
            </div>
            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
              <strong className="text-white block mb-1">No smartphone Android:</strong>
              Acesse o menu do navegador (três pontinhos) e toque em "Instalar aplicativo" ou
              "Adicionar à tela inicial".
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setGenericModalOpen(false)}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs mt-2"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
