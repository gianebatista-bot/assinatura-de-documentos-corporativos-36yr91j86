import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginView } from '@/components/LoginView'
import { Navbar } from '@/components/Navbar'
import { ColaboradorDashboard } from '@/components/ColaboradorDashboard'
import { CoordenadoraDashboard } from '@/components/CoordenadoraDashboard'
import { DocumentoReader } from '@/components/DocumentoReader'

const Index: React.FC = () => {
  const { user, loading, isCoordenadora } = useAuth()
  const [documentoAbertoId, setDocumentoAbertoId] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500" />
          <p className="text-sm text-slate-400">Carregando portal corporativo PRAFESTA...</p>
        </div>
      </div>
    )
  }

  // Se não estiver logado, exibe a tela de login
  if (!user) {
    return <LoginView />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onIrParaHome={() => setDocumentoAbertoId(null)} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {documentoAbertoId ? (
          <DocumentoReader
            documentoId={documentoAbertoId}
            usuario={user}
            onVoltar={() => setDocumentoAbertoId(null)}
          />
        ) : isCoordenadora ? (
          <CoordenadoraDashboard
            usuario={user}
            onVisualizarDocumento={(docId) => setDocumentoAbertoId(docId)}
          />
        ) : (
          <ColaboradorDashboard
            usuario={user}
            onSelecionarDocumento={(docId) => setDocumentoAbertoId(docId)}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="container mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            PRAFESTA Indústria e Comércio de Embalagens Ltda. • CNPJ 56.173.131/0001-25
          </p>
          <p className="text-slate-400 text-[11px]">
            Rua Antônio da Cunha Leite, 615, acesso Rod. Arão Sahm, 80, Portão, Atibaia/SP
          </p>
          <p className="text-slate-400">
            Plataforma de Assinatura Eletrônica e Treinamentos • Em conformidade com a MP
            2.200-2/2001, Código Civil e LGPD (Lei 13.709/2018)
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index
