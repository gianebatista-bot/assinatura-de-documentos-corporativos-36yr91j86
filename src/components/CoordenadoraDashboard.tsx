import React, { useEffect, useState } from 'react'
import type { Documento, Assinatura, Treinamento, User } from '@/types'
import { documentoService } from '@/services/documentos'
import { assinaturaService } from '@/services/assinaturas'
import { treinamentoService } from '@/services/treinamentos'
import { authService } from '@/services/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { GestaoColaboradores } from './GestaoColaboradores'
import { PublicarDocumentoView } from './PublicarDocumentoView'
import {
  gerarHTMLDocumentoAssinado,
  gerarHTMLCertificado,
  baixarArquivoHTML,
} from '@/lib/documentGenerators'
import {
  FileText,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Search,
  Award,
  Eye,
  Edit3,
  TrendingUp,
  FileCheck2,
  Instagram,
} from 'lucide-react'
import { toast } from 'sonner'
import prafestaLogo from '@/assets/logo.582f8581-2-88ba8.webp'

interface CoordenadoraDashboardProps {
  usuario: User
  onVisualizarDocumento: (docId: string) => void
}

export const CoordenadoraDashboard: React.FC<CoordenadoraDashboardProps> = ({
  usuario,
  onVisualizarDocumento,
}) => {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([])
  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([])
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Sub-telas de Coordenadora
  const [modoPublicar, setModoPublicar] = useState(false)
  const [documentoEditando, setDocumentoEditando] = useState<Documento | null>(null)

  // Filtros da Matriz de Conformidade
  const [docSelecionadoId, setDocSelecionadoId] = useState<string>('todos')
  const [buscaColaborador, setBuscaColaborador] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')

  const carregarTudo = async () => {
    try {
      setLoading(true)
      const [docs, ass, tr, us] = await Promise.all([
        documentoService.listAll(false),
        assinaturaService.listAll(),
        treinamentoService.listAll(),
        authService.listUsers(),
      ])
      setDocumentos(docs)
      setAssinaturas(ass)
      setTreinamentos(tr)
      setUsuarios(us)
    } catch (err) {
      toast.error('Erro ao carregar dados da coordenação.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarTudo()
  }, [])

  // Mapas rápidos
  // chave: `${userId}_${docId}`
  const assMap = new Map<string, Assinatura>()
  assinaturas.forEach((a) => {
    assMap.set(`${a.colaborador}_${a.documento}`, a)
  })

  const trMap = new Map<string, Treinamento>()
  treinamentos.forEach((t) => {
    trMap.set(`${t.colaborador}_${t.documento}`, t)
  })

  // Apenas usuários do perfil colaborador para a matriz
  const apenasColaboradores = usuarios.filter((u) => u.role === 'colaborador')

  // Gerar linhas da Matriz
  interface MatrizLinha {
    colaborador: User
    documento: Documento
    assinatura: Assinatura | null
    treinamento: Treinamento | null
    status: 'assinado' | 'treinamento_concluido' | 'pendente'
  }

  const matriz: MatrizLinha[] = []
  const docsAtivos = documentos.filter((d) => d.ativo)

  apenasColaboradores.forEach((colab) => {
    docsAtivos.forEach((doc) => {
      const ass = assMap.get(`${colab.id}_${doc.id}`) || null
      const tr = trMap.get(`${colab.id}_${doc.id}`) || null
      let status: 'assinado' | 'treinamento_concluido' | 'pendente' = 'pendente'
      if (ass) {
        status = 'assinado'
      } else if (tr && tr.aprovado) {
        status = 'treinamento_concluido'
      }
      matriz.push({
        colaborador: colab,
        documento: doc,
        assinatura: ass,
        treinamento: tr,
        status,
      })
    })
  })

  const matrizFiltrada = matriz.filter((item) => {
    if (docSelecionadoId !== 'todos' && item.documento.id !== docSelecionadoId) {
      return false
    }
    if (filtroStatus !== 'todos' && item.status !== filtroStatus) {
      return false
    }
    if (buscaColaborador.trim()) {
      const b = buscaColaborador.toLowerCase()
      const match =
        item.colaborador.name.toLowerCase().includes(b) ||
        item.colaborador.email.toLowerCase().includes(b) ||
        (item.colaborador.cargo && item.colaborador.cargo.toLowerCase().includes(b))
      if (!match) return false
    }
    return true
  })

  // Download do documento assinado pela coordenadora
  const handleBaixarDocAssinado = (item: MatrizLinha) => {
    if (!item.assinatura) return
    const html = gerarHTMLDocumentoAssinado({
      documento: item.documento,
      assinatura: item.assinatura,
      usuario: item.colaborador,
      treinamento: item.treinamento,
    })
    const nomeSanitizado = `${item.colaborador.name.replace(/\s+/g, '_')}_${item.documento.titulo.slice(0, 20).replace(/\s+/g, '_')}`
    baixarArquivoHTML(`prafesta-assinado-${nomeSanitizado}.html`, html)
    toast.success(`Download do documento assinado de ${item.colaborador.name} iniciado!`)
  }

  const handleBaixarCertificado = (item: MatrizLinha) => {
    if (!item.treinamento) return
    const html = gerarHTMLCertificado({
      documento: item.documento,
      treinamento: item.treinamento,
      assinatura: item.assinatura,
      usuario: item.colaborador,
    })
    const nomeSanitizado = `${item.colaborador.name.replace(/\s+/g, '_')}_${item.documento.titulo.slice(0, 20).replace(/\s+/g, '_')}`
    baixarArquivoHTML(`prafesta-certificado-${nomeSanitizado}.html`, html)
    toast.success(`Certificado de ${item.colaborador.name} emitido com sucesso!`)
  }

  if (modoPublicar) {
    return (
      <PublicarDocumentoView
        documentoEditando={documentoEditando}
        onVoltar={() => {
          setModoPublicar(false)
          setDocumentoEditando(null)
        }}
        onSalvo={() => {
          setModoPublicar(false)
          setDocumentoEditando(null)
          carregarTudo()
        }}
      />
    )
  }

  const totalAssinaturasRealizadas = assinaturas.length
  const taxaConformidade =
    matriz.length > 0 ? Math.round((totalAssinaturasRealizadas / matriz.length) * 100) : 0

  return (
    <div className="space-y-8 pb-16">
      {/* Banner da Coordenação */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/95 rounded-lg px-2.5 py-1 inline-flex items-center shadow-sm">
              <img src={prafestaLogo} alt="PRAFESTA" className="h-5 w-auto object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-semibold border border-rose-500/30">
              <FileCheck2 className="w-3.5 h-3.5" /> Painel de Gestão & Conformidade
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Gestão de Documentos e Assinaturas
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            Acompanhe o status em tempo real de leitura, treinamentos e assinaturas de todos os
            colaboradores, publique novos regulamentos e baixe registros assinados com valor legal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => {
              setDocumentoEditando(null)
              setModoPublicar(true)
            }}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" /> Publicar Novo Documento
          </Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Documentos Ativos
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-slate-900 flex items-center justify-between">
              {docsAtivos.length}
              <FileText className="w-5 h-5 text-slate-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Termos e cartilhas em vigor
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Colaboradores Cadastrados
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-blue-600 flex items-center justify-between">
              {apenasColaboradores.length}
              <Users className="w-5 h-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Usuários com acesso ao portal
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Assinaturas Coletadas
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-emerald-600 flex items-center justify-between">
              {totalAssinaturasRealizadas}
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Registros com data, hora e IP
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-slate-500 font-medium">
              Taxa de Conformidade
            </CardDescription>
            <CardTitle className="text-2xl font-extrabold text-rose-600 flex items-center justify-between">
              {taxaConformidade}%
              <TrendingUp className="w-5 h-5 text-rose-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-[11px] text-slate-500">
            Índice de assinaturas concluídas
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Controle: Matriz de Assinaturas | Gestão de Documentos | Gestão de Colaboradores */}
      <Tabs defaultValue="matriz" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-slate-100 p-1 rounded-xl h-auto">
          <TabsTrigger
            value="matriz"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            1. Matriz de Assinaturas e Treinamento
          </TabsTrigger>
          <TabsTrigger
            value="documentos"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-2"
          >
            <FileText className="w-4 h-4" />
            2. Documentos Corporativos
          </TabsTrigger>
          <TabsTrigger
            value="colaboradores"
            className="py-2.5 text-xs md:text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-2"
          >
            <Users className="w-4 h-4" />
            3. Gestão de Colaboradores
          </TabsTrigger>
        </TabsList>

        {/* ABA 1: MATRIZ DE ACOMPANHAMENTO DETALHADA */}
        <TabsContent value="matriz" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Filtrar por nome ou e-mail do colaborador..."
                  value={buscaColaborador}
                  onChange={(e) => setBuscaColaborador(e.target.value)}
                  className="pl-9 bg-white border-slate-300 text-xs"
                />
              </div>

              <Select value={docSelecionadoId} onValueChange={setDocSelecionadoId}>
                <SelectTrigger className="w-full sm:w-[240px] bg-white border-slate-300 text-xs">
                  <SelectValue placeholder="Todos os Documentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Documentos</SelectItem>
                  {documentos.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.codigo ? `[${d.codigo}] ` : ''}
                      {d.titulo.slice(0, 30)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full sm:w-[170px] bg-white border-slate-300 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="assinado">Assinado</SelectItem>
                  <SelectItem value="treinamento_concluido">Treinamento Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-xs font-bold text-slate-700">Colaborador</TableHead>
                  <TableHead className="text-xs font-bold text-slate-700">Documento</TableHead>
                  <TableHead className="text-xs font-bold text-slate-700">Treinamento</TableHead>
                  <TableHead className="text-xs font-bold text-slate-700">
                    Status de Assinatura
                  </TableHead>
                  <TableHead className="text-xs font-bold text-slate-700">Data e Hora</TableHead>
                  <TableHead className="text-xs font-bold text-slate-700 text-right">
                    Ação / Arquivos
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                      Carregando matriz de assinaturas...
                    </TableCell>
                  </TableRow>
                ) : matrizFiltrada.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                      Nenhum registro encontrado para este filtro.
                    </TableCell>
                  </TableRow>
                ) : (
                  matrizFiltrada.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-slate-50/70 text-xs">
                      <TableCell>
                        <div className="font-semibold text-slate-900">{item.colaborador.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {item.colaborador.cargo || 'Colaborador'} •{' '}
                          {item.colaborador.setor || 'Geral'}
                        </div>
                        {item.assinatura?.instagram && (
                          <div className="inline-flex items-center gap-1 text-[10px] text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200 mt-1 font-mono">
                            <Instagram className="w-3 h-3 text-pink-600" />
                            {item.assinatura.instagram}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="font-medium text-slate-900 line-clamp-1">
                          {item.documento.titulo}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.documento.codigo || 'DOC'}
                        </div>
                      </TableCell>

                      <TableCell>
                        {item.treinamento && item.treinamento.aprovado ? (
                          <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                            <Award className="w-3.5 h-3.5" />
                            <span>Aprovado ({item.treinamento.nota}%)</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Não realizado
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {item.status === 'assinado' ? (
                          <Badge className="bg-emerald-600 text-white text-[10px] gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Assinado
                          </Badge>
                        ) : item.status === 'treinamento_concluido' ? (
                          <Badge className="bg-blue-600 text-white text-[10px] gap-1">
                            <Clock className="w-3 h-3" /> Treinado (Pendente)
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-amber-400 text-amber-700 bg-amber-50 text-[10px] gap-1"
                          >
                            <Clock className="w-3 h-3" /> Pendente
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="font-mono text-[11px] text-slate-600">
                        {item.assinatura
                          ? new Date(item.assinatura.data_hora).toLocaleString('pt-BR', {
                              timeZone: 'America/Sao_Paulo',
                            })
                          : '—'}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1">
                          {item.assinatura ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBaixarDocAssinado(item)}
                              title="Baixar Documento Assinado (registro oficial)"
                              className="h-8 px-2.5 text-[11px] border-emerald-300 text-emerald-800 hover:bg-emerald-50 gap-1"
                            >
                              <Download className="w-3 h-3" /> Salvar Assinado
                            </Button>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Pendente</span>
                          )}

                          {item.treinamento && item.treinamento.aprovado && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleBaixarCertificado(item)}
                              title="Baixar Certificado de Treinamento"
                              className="h-8 px-2 text-[11px] text-blue-700 hover:bg-blue-50"
                            >
                              <Award className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ABA 2: LISTA E GESTÃO DE DOCUMENTOS */}
        <TabsContent value="documentos" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Documentos Oficiais da PRAFESTA</h3>
            <Button
              size="sm"
              onClick={() => {
                setDocumentoEditando(null)
                setModoPublicar(true)
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-1.5 text-xs"
            >
              <Plus className="w-4 h-4" /> Novo Documento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentos.map((d) => (
              <Card
                key={d.id}
                className="border-slate-200 shadow-sm bg-white flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {d.codigo || 'DOC'}
                      </span>
                      <Badge
                        variant={d.ativo ? 'default' : 'secondary'}
                        className={
                          d.ativo ? 'bg-emerald-600 text-white text-[10px]' : 'text-[10px]'
                        }
                      >
                        {d.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold text-slate-900 leading-snug">
                      {d.titulo}
                    </CardTitle>
                    {d.subtitulo && (
                      <CardDescription className="text-xs line-clamp-1 mt-1">
                        {d.subtitulo}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2 pb-3 text-xs text-slate-600">
                    <p className="line-clamp-2">{d.ementa}</p>
                    <div className="pt-2 border-t flex justify-between text-[11px] text-slate-500">
                      <span>
                        Rev: <strong>{d.revisao || '—'}</strong>
                      </span>
                      <span>
                        Seções: <strong>{d.secoes?.length || 0}</strong>
                      </span>
                      <span>
                        Perguntas: <strong>{d.perguntas_quiz?.length || 0}</strong>
                      </span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-3 border-t bg-slate-50 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onVisualizarDocumento(d.id)}
                    className="text-xs flex-1 gap-1 border-slate-300"
                  >
                    <Eye className="w-3.5 h-3.5" /> Visualizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDocumentoEditando(d)
                      setModoPublicar(true)
                    }}
                    className="text-xs flex-1 gap-1 border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ABA 3: GESTÃO DE COLABORADORES */}
        <TabsContent value="colaboradores" className="mt-6">
          <GestaoColaboradores usuarios={usuarios} onRecarregar={carregarTudo} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
