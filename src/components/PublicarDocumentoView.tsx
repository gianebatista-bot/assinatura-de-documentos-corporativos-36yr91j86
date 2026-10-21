import React, { useState } from 'react'
import type { Documento, PerguntaQuiz, SecaoDocumento } from '@/types'
import { documentoService } from '@/services/documentos'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2, ArrowLeft, Save, Sparkles, HelpCircle, Layers } from 'lucide-react'
import { toast } from 'sonner'

interface PublicarDocumentoModalProps {
  documentoEditando?: Documento | null
  onVoltar: () => void
  onSalvo: () => void
}

export const PublicarDocumentoView: React.FC<PublicarDocumentoModalProps> = ({
  documentoEditando,
  onVoltar,
  onSalvo,
}) => {
  const [titulo, setTitulo] = useState(documentoEditando?.titulo || '')
  const [subtitulo, setSubtitulo] = useState(documentoEditando?.subtitulo || '')
  const [codigo, setCodigo] = useState(documentoEditando?.codigo || '')
  const [revisao, setRevisao] = useState(documentoEditando?.revisao || 'Rev. 001')
  const [ementa, setEmenta] = useState(documentoEditando?.ementa || '')
  const [localPadrao, setLocalPadrao] = useState(documentoEditando?.local_padrao || 'Atibaia/SP')
  const [declaracaoVerbatim, setDeclaracaoVerbatim] = useState(
    documentoEditando?.declaracao_verbatim ||
      'Declaro para todos os fins de direito que recebi, li e compreendi integralmente as diretrizes e normas contidas no presente documento da PRAFESTA, assumindo o compromisso solene de cumpri-las rigorosamente.',
  )
  const [ativo, setAtivo] = useState(documentoEditando ? documentoEditando.ativo : true)

  // Seções do documento
  const [secoes, setSecoes] = useState<SecaoDocumento[]>(() => {
    if (documentoEditando?.secoes && documentoEditando.secoes.length > 0) {
      return documentoEditando.secoes
    }
    return [
      {
        numero: '1',
        titulo: 'Objetivo e Diretrizes Gerais',
        conteudo:
          'Descreva os objetivos fundamentais e normas estabelecidas para os colaboradores.',
      },
    ]
  })

  // Perguntas do Quiz
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>(() => {
    if (documentoEditando?.perguntas_quiz && documentoEditando.perguntas_quiz.length > 0) {
      return documentoEditando.perguntas_quiz
    }
    return [
      {
        id: 'q1',
        pergunta: 'Qual a principal regra descrita neste documento?',
        opcoes: [
          'Cumprir com zelo, ética e responsabilidade todas as diretrizes da PRAFESTA',
          'Não há regras obrigatórias',
          'As normas se aplicam apenas aos visitantes',
          'Apenas a liderança deve seguir',
        ],
        respostaCorreta: 0,
        explicacao:
          'O documento formaliza o compromisso integral de todos os colaboradores com as normas e integridade da PRAFESTA.',
      },
    ]
  })

  const [salvando, setSalvando] = useState(false)

  // Gestão de Seções
  const handleAdicionarSecao = () => {
    const proximoNum = String(secoes.length + 1)
    setSecoes([
      ...secoes,
      {
        numero: proximoNum,
        titulo: `Nova Seção ${proximoNum}`,
        conteudo: '',
      },
    ])
  }

  const handleRemoverSecao = (index: number) => {
    if (secoes.length <= 1) {
      toast.warning('O documento deve possuir pelo menos 1 seção de conteúdo.')
      return
    }
    setSecoes(secoes.filter((_, i) => i !== index))
  }

  const handleAtualizarSecao = (index: number, campo: keyof SecaoDocumento, valor: string) => {
    const novas = [...secoes]
    novas[index] = { ...novas[index], [campo]: valor }
    setSecoes(novas)
  }

  // Gestão de Perguntas
  const handleAdicionarPergunta = () => {
    const novoId = `q_${Date.now()}`
    setPerguntas([
      ...perguntas,
      {
        id: novoId,
        pergunta: 'Nova pergunta sobre o documento',
        opcoes: ['Opção 1 (Correta)', 'Opção 2', 'Opção 3', 'Opção 4'],
        respostaCorreta: 0,
        explicacao: 'Explicação detalhada da regra para feedback imediato ao colaborador.',
      },
    ])
  }

  const handleRemoverPergunta = (index: number) => {
    setPerguntas(perguntas.filter((_, i) => i !== index))
  }

  const handleAtualizarPergunta = (index: number, campo: keyof PerguntaQuiz, valor: unknown) => {
    const novas = [...perguntas]
    novas[index] = { ...novas[index], [campo]: valor }
    setPerguntas(novas)
  }

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim()) {
      toast.error('Informe o título do documento.')
      return
    }

    try {
      setSalvando(true)
      if (documentoEditando) {
        await documentoService.update(documentoEditando.id, {
          titulo,
          subtitulo,
          codigo,
          revisao,
          ementa,
          local_padrao: localPadrao,
          declaracao_verbatim: declaracaoVerbatim,
          secoes,
          perguntas_quiz: perguntas,
          ativo,
        })
        toast.success('Documento atualizado com sucesso!')
      } else {
        await documentoService.create({
          titulo,
          subtitulo,
          codigo: codigo || `DOC-${Date.now().toString().slice(-4)}`,
          revisao,
          ementa,
          local_padrao: localPadrao,
          declaracao_verbatim: declaracaoVerbatim,
          secoes,
          perguntas_quiz: perguntas,
          ativo,
          data_publicacao: new Date().toLocaleDateString('pt-BR'),
        })
        toast.success('Novo documento corporativo publicado com sucesso!')
      }
      onSalvo()
    } catch (err) {
      toast.error('Erro ao salvar documento no banco de dados.')
      console.error(err)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <form onSubmit={handleSalvar} className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between border-b pb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onVoltar}
          className="text-slate-600 hover:text-slate-900 gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Cancelar e Voltar ao Painel
        </Button>
        <Button
          type="submit"
          disabled={salvando}
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-1.5"
        >
          <Save className="w-4 h-4" />
          {salvando
            ? 'Salvando...'
            : documentoEditando
              ? 'Salvar Alterações'
              : 'Publicar Documento'}
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            {documentoEditando
              ? 'Editar Documento Corporativo'
              : 'Publicar Novo Documento Corporativo'}
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Cadastre os dados essenciais, seções de texto e as perguntas do treinamento interativo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="titulo" className="text-xs font-semibold">
                Título Oficial do Documento *
              </Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Política de Segurança da Informação e LGPD"
                required
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="subtitulo" className="text-xs font-semibold">
                Subtítulo / Descrição Rápida
              </Label>
              <Input
                id="subtitulo"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                placeholder="Ex: Diretrizes corporativas para proteção de ativos digitais"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="codigo" className="text-xs font-semibold">
                Código Normativo
              </Label>
              <Input
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ex: POL-TI-005"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="revisao" className="text-xs font-semibold">
                Revisão / Edição
              </Label>
              <Input
                id="revisao"
                value={revisao}
                onChange={(e) => setRevisao(e.target.value)}
                placeholder="Ex: Rev. 024 (2026)"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="local" className="text-xs font-semibold">
                Local Padrão da Assinatura
              </Label>
              <Input
                id="local"
                value={localPadrao}
                onChange={(e) => setLocalPadrao(e.target.value)}
                placeholder="Ex: Atibaia/SP"
              />
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <Switch id="ativo" checked={ativo} onCheckedChange={setAtivo} />
              <Label htmlFor="ativo" className="text-xs font-semibold cursor-pointer">
                Documento Ativo para Colaboradores
              </Label>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="ementa" className="text-xs font-semibold">
                Ementa / Resumo do Documento
              </Label>
              <Textarea
                id="ementa"
                rows={2}
                value={ementa}
                onChange={(e) => setEmenta(e.target.value)}
                placeholder="Breve resumo sobre o objetivo e aplicação desta norma."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÕES DO DOCUMENTO */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-600" /> Seções do Documento
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Estruture o texto em seções numeradas para facilitar a leitura dos colaboradores.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdicionarSecao}
            className="text-xs gap-1 border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Seção
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {secoes.map((sec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    className="w-16 bg-white font-bold text-center text-xs"
                    value={sec.numero}
                    onChange={(e) => handleAtualizarSecao(idx, 'numero', e.target.value)}
                    placeholder="1"
                  />
                  <Input
                    className="bg-white font-semibold text-sm"
                    value={sec.titulo}
                    onChange={(e) => handleAtualizarSecao(idx, 'titulo', e.target.value)}
                    placeholder="Título da seção"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoverSecao(idx)}
                  className="text-slate-400 hover:text-rose-600 h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                rows={4}
                className="bg-white text-xs leading-relaxed"
                value={sec.conteudo}
                onChange={(e) => handleAtualizarSecao(idx, 'conteudo', e.target.value)}
                placeholder="Texto explicativo com as regras, direitos e deveres desta seção..."
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* DECLARAÇÃO VERBATIM DE ASSINATURA */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">
            Declaração Formal de Aceite (Texto Verbatim)
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Texto estrito que o colaborador lê e assina eletronicamente na confirmação de ciência.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={4}
            className="font-serif text-xs leading-relaxed bg-amber-50/40 border-amber-200"
            value={declaracaoVerbatim}
            onChange={(e) => setDeclaracaoVerbatim(e.target.value)}
            placeholder="Declaro, para os devidos fins, que recebi da PRAFESTA..."
          />
        </CardContent>
      </Card>

      {/* PERGUNTAS DO QUIZ DE TREINAMENTO */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-rose-600" /> Quiz do Treinamento Interativo
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Questões de múltipla escolha com feedback explicativo imediato.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdicionarPergunta}
            className="text-xs gap-1 border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {perguntas.map((p, pIdx) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-700">Pergunta {pIdx + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoverPergunta(pIdx)}
                  className="text-slate-400 hover:text-rose-600 h-7 w-7"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <Input
                className="bg-white font-medium text-xs"
                value={p.pergunta}
                onChange={(e) => handleAtualizarPergunta(pIdx, 'pergunta', e.target.value)}
                placeholder="Enunciado da pergunta..."
              />

              <div className="space-y-2 pt-1">
                <Label className="text-[11px] font-semibold text-slate-600">
                  Opções de Resposta (Selecione o botão da resposta correta):
                </Label>
                {p.opcoes.map((opcao, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correta_${p.id}`}
                      checked={p.respostaCorreta === optIdx}
                      onChange={() => handleAtualizarPergunta(pIdx, 'respostaCorreta', optIdx)}
                      className="accent-rose-600"
                    />
                    <Input
                      className="bg-white text-xs flex-1"
                      value={opcao}
                      onChange={(e) => {
                        const novasOpcoes = [...p.opcoes]
                        novasOpcoes[optIdx] = e.target.value
                        handleAtualizarPergunta(pIdx, 'opcoes', novasOpcoes)
                      }}
                      placeholder={`Opção ${optIdx + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1 pt-1">
                <Label className="text-[11px] font-semibold text-slate-600">
                  Explicação e Fundamento do Feedback (Exibido imediatamente ao colaborador):
                </Label>
                <Input
                  className="bg-white text-xs text-slate-700"
                  value={p.explicacao}
                  onChange={(e) => handleAtualizarPergunta(pIdx, 'explicacao', e.target.value)}
                  placeholder="Fundamento da regra na norma corporativa..."
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t bg-slate-50 flex justify-end">
          <Button
            type="submit"
            disabled={salvando}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-1.5"
          >
            <Save className="w-4 h-4" />
            {salvando
              ? 'Salvando...'
              : documentoEditando
                ? 'Salvar Alterações'
                : 'Publicar Documento'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
