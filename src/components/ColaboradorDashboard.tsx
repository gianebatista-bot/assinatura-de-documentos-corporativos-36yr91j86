import React, { useEffect, useState } from 'react'
import type { DocumentoComStatus, User } from '@/types'
import { documentoService } from '@/services/documentos'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  gerarHTMLCertificado,
  gerarHTMLDocumentoAssinado,
  baixarArquivoHTML,
} from '@/lib/documentGenerators'
import {
  FileText,
  CheckCircle2,
  Clock,
  Award,
  Search,
  BookOpen,
  Download,
  AlertCircle,
  Building,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import prafestaLogo from '@/assets/logo.582f8581-2-88ba8.webp'

interface ColaboradorDashboardProps {
  usuario: User
  onSelecionarDocumento: (docId: string) => void
}

export const ColaboradorDashboard: React.FC<ColaboradorDashboardProps> = ({
  usuario,
  onSelecionarDocumento,
}) => {
  const [documentos, setDocumentos] = useState<DocumentoComStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')

  const carregarDocumentos = async () => {
    try {
      setLoading(true)
      const docs = await documentoService.listForColaborador(usuario.id)
      setDocumentos(docs)
    } catch (err) {
      toast.error('Erro ao listar documentos corporativos.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDocumentos()
  }, [usuario.id])

  const filtrados = documentos.filter((d) => {
    const matchBusca =
      d.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      (d.codigo && d.codigo.toLowerCase().includes(busca.toLowerCase())) ||
      (d.ementa && d.ementa.toLowerCase().includes(busca.toLowerCase()))

    if (!matchBusca) return false
    if (filtroStatus === 'todos') return true
    return d.status === filtroStatus
  })

  const totalAssinados = documentos.filter((d) => d.status === 'assinado').length
  const totalPendentes = documentos.filter((d) => d.status !== 'assinado').length
  const totalTreinamentos = documentos.filter((d) => d.meuTreinamento?.aprovado).length

  const handleBaixarCertificado = (d: DocumentoComStatus, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!d.meuTreinamento) {
      toast.error('Treinamento pendente para este documento.')
      return
    }
    const html = gerarHTMLCertificado({
      documento: d,
      treinamento: d.meuTreinamento,
      assinatura: d.minhaAssinatura,
      usuario,
    })
    const nomeSanitizado = d.titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30)
    baixarArquivoHTML(`prafesta-certificado-${nomeSanitizado}.html`, html)
    toast.success('Certificado digital emitido e baixado!')
  }

  const handleBaixarDocAssinado = (d: DocumentoComStatus, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!d.minhaAssinatura) return
    const html = gerarHTMLDocumentoAssinado({
      documento: d,
      assinatura: d.minhaAssinatura,
      usuario,
      treinamento: d.meuTreinamento,
    })
    const nomeSanitizado = d.titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30)
    baixarArquivoHTML(`prafesta-documento-assinado-${nomeSanitizado}.html`, html)
    toast.success('Documento assinado baixado!')
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Banner de Boas-Vindas */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/95 rounded-lg px-2.5 py-1 inline-flex items-center shadow-sm">
              <img src={prafestaLogo} alt="PRAFESTA" className="h-5 w-auto object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-semibold border border-rose-500/30">
              <Building className="w-3.5 h-3.5" /> Portal do Colaborador
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Olá, {usuario.name}!
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Acesse seus documentos normativos oficiais, realize o treinamento interativo de cada
            cartilha e formalize suas assinaturas de ciência e conformidade com validade jurídica.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-400">
            {usuario.cargo && (
              <span>
                Cargo: <strong className="text-slate-200">{usuario.cargo}</strong>
              </span>
            )}
            {usuario.setor && (
              <span>
                Setor: <strong className="text-slate-200">{usuario.setor}</strong>
              </span>
            )}
            {usuario.cpf && (
              <span>
                CPF: <strong className="text-slate-200">{usuario.cpf}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Assinaturas Concluídas
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-emerald-600 flex items-center justify-between">
              {totalAssinados} / {documentos.length}
              <CheckCircle2 className="w-6 h-6 text-emerald-500/30" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Documentos assinados com registro de data/hora
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Treinamentos Realizados
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-blue-600 flex items-center justify-between">
              {totalTreinamentos} / {documentos.length}
              <Award className="w-6 h-6 text-blue-500/30" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Quizzes com aproveitamento superior a 70%
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Pendências
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-rose-600 flex items-center justify-between">
              {totalPendentes}
              <Clock className="w-6 h-6 text-rose-500/30" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            {totalPendentes === 0 ? 'Tudo em dia!' : 'Aguardando sua leitura e assinatura'}
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por título, código ou palavra-chave..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 bg-white border-slate-300 text-sm"
          />
        </div>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white border-slate-300 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="treinamento_concluido">Treinamento Concluído</SelectItem>
            <SelectItem value="assinado">Assinados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Documentos */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-3" />
          <p className="text-sm text-slate-500">Carregando documentos corporativos...</p>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-16 bg-white border rounded-2xl p-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-700">Nenhum documento encontrado</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {busca
              ? 'Tente ajustar os termos de busca.'
              : 'Não há documentos disponíveis para este filtro no momento.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((doc) => {
            const isAssinado = doc.status === 'assinado'
            const isTreinamentoConcluido = Boolean(doc.meuTreinamento?.aprovado)

            return (
              <Card
                key={doc.id}
                onClick={() => onSelecionarDocumento(doc.id)}
                className={`border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                  isAssinado
                    ? 'border-emerald-200 bg-white hover:border-emerald-400'
                    : 'border-slate-200 bg-white hover:border-rose-400'
                }`}
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {doc.codigo || 'DOC-PRAFESTA'}
                      </span>

                      {/* Badge de Status */}
                      {isAssinado ? (
                        <Badge className="bg-emerald-600 text-white gap-1 text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Assinado
                        </Badge>
                      ) : isTreinamentoConcluido ? (
                        <Badge className="bg-blue-600 text-white gap-1 text-[11px]">
                          <ShieldCheck className="w-3 h-3" /> Treinado (Pendente Assinatura)
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-amber-700 bg-amber-50 gap-1 text-[11px]"
                        >
                          <Clock className="w-3 h-3" /> Pendente
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {doc.titulo}
                    </CardTitle>
                    {doc.subtitulo && (
                      <CardDescription className="text-xs line-clamp-1 mt-1">
                        {doc.subtitulo}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-3 pb-3">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {doc.ementa ||
                        'Documento institucional oficial de compliance e normas internas.'}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        Rev: <strong>{doc.revisao || '01'}</strong>
                      </span>
                      <span>
                        Pub: <strong>{doc.data_publicacao || '2026'}</strong>
                      </span>
                    </div>

                    {/* Detalhes de Assinatura se houver */}
                    {isAssinado && doc.minhaAssinatura && (
                      <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-[11px] text-emerald-900">
                        Assinado em{' '}
                        <strong>
                          {new Date(doc.minhaAssinatura.data_hora).toLocaleDateString('pt-BR')}
                        </strong>
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="pt-3 border-t bg-slate-50/50 flex flex-col gap-2">
                  <div className="w-full flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs flex-1 gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {isAssinado ? 'Visualizar Documento' : 'Ler e Assinar'}
                    </Button>
                  </div>

                  {/* Botões de Download direto se já assinado/treinado */}
                  {(isAssinado || isTreinamentoConcluido) && (
                    <div className="w-full flex items-center gap-1.5">
                      {isTreinamentoConcluido && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleBaixarCertificado(doc, e)}
                          className="flex-1 text-[11px] border-blue-200 text-blue-700 hover:bg-blue-50 h-8 gap-1"
                        >
                          <Award className="w-3 h-3" /> Certificado
                        </Button>
                      )}
                      {isAssinado && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleBaixarDocAssinado(doc, e)}
                          className="flex-1 text-[11px] border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-8 gap-1"
                        >
                          <Download className="w-3 h-3" /> Doc Assinado
                        </Button>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
