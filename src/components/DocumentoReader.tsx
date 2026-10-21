import React, { useEffect, useState } from 'react'
import type { Documento, Assinatura, Treinamento, User } from '@/types'
import { documentoService } from '@/services/documentos'
import { assinaturaService } from '@/services/assinaturas'
import { treinamentoService } from '@/services/treinamentos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { QuizViewer } from './QuizViewer'
import { AssinaturaSection } from './AssinaturaSection'
import {
  gerarHTMLCertificado,
  gerarHTMLDocumentoAssinado,
  baixarArquivoHTML,
} from '@/lib/documentGenerators'
import {
  FileText,
  Award,
  PenLine,
  ArrowLeft,
  Download,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  Clock,
  Printer,
} from 'lucide-react'
import { toast } from 'sonner'

interface DocumentoReaderProps {
  documentoId: string
  usuario: User
  onVoltar: () => void
}

export const DocumentoReader: React.FC<DocumentoReaderProps> = ({
  documentoId,
  usuario,
  onVoltar,
}) => {
  const [doc, setDoc] = useState<Documento | null>(null)
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null)
  const [treinamento, setTreinamento] = useState<Treinamento | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'leitura' | 'treinamento' | 'assinatura'>('leitura')

  const carregarDados = async () => {
    try {
      setLoading(true)
      const [d, a, t] = await Promise.all([
        documentoService.getById(documentoId),
        assinaturaService.getByUserAndDocument(usuario.id, documentoId),
        treinamentoService.getByUserAndDocument(usuario.id, documentoId),
      ])
      setDoc(d)
      setAssinatura(a)
      setTreinamento(t)
    } catch (err) {
      toast.error('Erro ao carregar documento.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [documentoId])

  if (loading || !doc) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-3" />
        <p className="text-sm text-slate-500">Carregando documento e dados regulatórios...</p>
      </div>
    )
  }

  const jaAssinou = Boolean(assinatura)
  const treinamentoAprovado = Boolean(treinamento?.aprovado)
  const podeEmitirCertificado = jaAssinou && treinamentoAprovado

  const handleBaixarCertificado = () => {
    if (!treinamento) {
      toast.error('Conclua o treinamento interativo para emitir o certificado.')
      return
    }
    const html = gerarHTMLCertificado({
      documento: doc,
      treinamento,
      assinatura,
      usuario,
    })
    const nomeSanitizado = doc.titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30)
    baixarArquivoHTML(`prafesta-certificado-${nomeSanitizado}.html`, html)
    toast.success('Certificado digital emitido e baixado com sucesso!')
  }

  const handleBaixarDocAssinado = () => {
    if (!assinatura) return
    const html = gerarHTMLDocumentoAssinado({
      documento: doc,
      assinatura,
      usuario,
      treinamento,
    })
    const nomeSanitizado = doc.titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30)
    baixarArquivoHTML(`prafesta-documento-assinado-${nomeSanitizado}.html`, html)
    toast.success('Documento assinado baixado com registro probatório!')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Barra de Navegação Superior */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={onVoltar}
          className="text-slate-600 hover:text-slate-900 gap-1.5 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar à lista de documentos
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          {podeEmitirCertificado && (
            <Button
              onClick={handleBaixarCertificado}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5"
            >
              <Award className="w-4 h-4" /> Baixar Certificado de Treinamento
            </Button>
          )}

          {jaAssinou && (
            <Button
              variant="outline"
              onClick={handleBaixarDocAssinado}
              className="border-slate-300 text-slate-700 hover:bg-slate-100 text-xs gap-1.5"
            >
              <Download className="w-4 h-4" /> Baixar Documento Assinado
            </Button>
          )}
        </div>
      </div>

      {/* Cabeçalho do Documento */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-md">
              PRAFESTA
            </span>
            {doc.codigo && (
              <Badge variant="outline" className="font-mono text-xs">
                {doc.codigo}
              </Badge>
            )}
            {doc.revisao && (
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                {doc.revisao}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            {doc.data_publicacao && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {doc.data_publicacao}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" /> Prafesta Embalagens
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {doc.titulo}
          </h1>
          {doc.subtitulo && (
            <p className="text-sm md:text-base text-slate-600 mt-1 font-medium">{doc.subtitulo}</p>
          )}
        </div>

        {/* Status badges de progresso */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t text-xs">
          <span className="text-slate-500 font-medium">Seu status neste documento:</span>
          {jaAssinou ? (
            <Badge className="bg-emerald-600 text-white gap-1 py-1 px-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Assinado
            </Badge>
          ) : (
            <Badge variant="destructive" className="bg-amber-600 text-white gap-1 py-1 px-2.5">
              <Clock className="w-3.5 h-3.5" /> Assinatura Pendente
            </Badge>
          )}

          {treinamentoAprovado ? (
            <Badge className="bg-blue-600 text-white gap-1 py-1 px-2.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Treinamento Concluído ({treinamento?.nota}%)
            </Badge>
          ) : (
            <Badge variant="outline" className="border-slate-300 text-slate-600 gap-1 py-1 px-2.5">
              <Award className="w-3.5 h-3.5" /> Treinamento Não Concluído
            </Badge>
          )}
        </div>
      </div>

      {/* Tabs Principais: Leitura | Treinamento | Assinatura */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full bg-slate-100 p-1 rounded-xl h-auto">
          <TabsTrigger
            value="leitura"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-2"
          >
            <FileText className="w-4 h-4" />
            1. Leitura do Documento
          </TabsTrigger>
          <TabsTrigger
            value="treinamento"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-rose-600 gap-2"
          >
            <Award className="w-4 h-4" />
            2. Treinamento Interativo
            {treinamentoAprovado && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
          </TabsTrigger>
          <TabsTrigger
            value="assinatura"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-2"
          >
            <PenLine className="w-4 h-4" />
            3. Assinatura e Adesão
            {jaAssinou && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
          </TabsTrigger>
        </TabsList>

        {/* ABA 1: LEITURA COMPLETA ESTRUTURADA */}
        <TabsContent value="leitura" className="mt-6 space-y-6">
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50/70 border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Conteúdo Integral do Instrumento
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Leia atenciosamente todas as seções e normas estabelecidas pela PRAFESTA.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="hidden md:flex text-xs gap-1.5 text-slate-600 border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5" /> Imprimir Documento
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Seções Estruturadas */}
              {doc.secoes && doc.secoes.length > 0 ? (
                <div className="space-y-8">
                  {doc.secoes.map((secao) => (
                    <section
                      key={secao.numero}
                      className="border-b border-slate-100 pb-6 last:border-0"
                    >
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-extrabold text-rose-600 text-lg">
                          {secao.numero}.
                        </span>
                        <h2 className="text-lg md:text-xl font-bold text-slate-900">
                          {secao.titulo}
                        </h2>
                      </div>
                      <div className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-wrap pl-6 border-l-2 border-slate-200">
                        {secao.conteudo}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-700 whitespace-pre-wrap">{doc.ementa}</div>
              )}

              {/* Destaque do Termo Final Verbatim na leitura */}
              {doc.declaracao_verbatim && (
                <div className="mt-8 p-5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Declaração de Adesão e Ciência (Texto Oficial Vinculativo)
                  </div>
                  <div className="font-serif text-xs md:text-sm text-amber-950 leading-relaxed whitespace-pre-wrap">
                    {doc.declaracao_verbatim}
                  </div>
                </div>
              )}

              {/* Botão para avançar para a próxima etapa */}
              <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Após concluir a leitura, teste seus conhecimentos no treinamento para liberar a
                  assinatura.
                </span>
                <Button
                  onClick={() => setActiveTab('treinamento')}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm px-6 w-full sm:w-auto"
                >
                  Ir para o Treinamento Interativo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 2: TREINAMENTO INTERATIVO */}
        <TabsContent value="treinamento" className="mt-6">
          <QuizViewer
            documentoId={doc.id}
            documentoTitulo={doc.titulo}
            perguntas={doc.perguntas_quiz || []}
            colaboradorId={usuario.id}
            colaboradorNome={usuario.name}
            treinamentoExistente={treinamento}
            onConcluido={(t) => {
              setTreinamento(t)
            }}
            onIrParaAssinatura={() => setActiveTab('assinatura')}
          />
        </TabsContent>

        {/* ABA 3: ASSINATURA FORMAL */}
        <TabsContent value="assinatura" className="mt-6">
          <AssinaturaSection
            documento={doc}
            usuario={usuario}
            assinaturaExistente={assinatura}
            treinamentoConcluido={treinamentoAprovado}
            onAssinado={(a) => {
              setAssinatura(a)
            }}
            onVoltarTreinamento={() => setActiveTab('treinamento')}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
