import React, { useState } from 'react'
import type { PerguntaQuiz, Treinamento } from '@/types'
import { treinamentoService } from '@/services/treinamentos'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  CheckCircle2,
  XCircle,
  Award,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'

interface QuizViewerProps {
  documentoId: string
  documentoTitulo: string
  perguntas: PerguntaQuiz[]
  colaboradorId: string
  colaboradorNome: string
  treinamentoExistente?: Treinamento | null
  onConcluido: (treinamento: Treinamento) => void
  onIrParaAssinatura: () => void
}

export const QuizViewer: React.FC<QuizViewerProps> = ({
  documentoId,
  documentoTitulo,
  perguntas,
  colaboradorId,
  colaboradorNome,
  treinamentoExistente,
  onConcluido,
  onIrParaAssinatura,
}) => {
  const [respostas, setRespostas] = useState<Record<string, number>>(() => {
    return treinamentoExistente?.respostas || {}
  })

  // Mostra feedback imediato por questão se o usuário já submeteu
  const [perguntasVerificadas, setPerguntasVerificadas] = useState<Record<string, boolean>>(() => {
    if (treinamentoExistente) {
      const initial: Record<string, boolean> = {}
      perguntas.forEach((q) => {
        initial[q.id] = true
      })
      return initial
    }
    return {}
  })

  const [resultadoFinal, setResultadoFinal] = useState<Treinamento | null>(
    treinamentoExistente || null,
  )
  const [salvando, setSalvando] = useState(false)

  if (!perguntas || perguntas.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border rounded-xl">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-800">Sem perguntas cadastradas</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
          Este documento não possui quiz de treinamento interativo obrigatório. Você pode prosseguir
          diretamente para a assinatura.
        </p>
        <Button
          onClick={onIrParaAssinatura}
          className="mt-4 bg-rose-600 hover:bg-rose-500 text-white"
        >
          Avançar para Assinatura
        </Button>
      </div>
    )
  }

  const handleSelecionarOpcao = (perguntaId: string, opcaoIndex: number) => {
    // Permite alterar a resposta e já habilita feedback imediato
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: opcaoIndex,
    }))
    setPerguntasVerificadas((prev) => ({
      ...prev,
      [perguntaId]: true,
    }))
  }

  const calcularEstatisticas = () => {
    let acertos = 0
    perguntas.forEach((p) => {
      if (respostas[p.id] === p.respostaCorreta) {
        acertos++
      }
    })
    const total = perguntas.length
    const nota = Math.round((acertos / total) * 100)
    const aprovado = nota >= 70 // 70% de aproveitamento mínimo
    return { acertos, total, nota, aprovado }
  }

  const todasRespondidas = perguntas.every((p) => respostas[p.id] !== undefined)

  const handleFinalizarTreinamento = async () => {
    if (!todasRespondidas) {
      toast.warning('Por favor, responda a todas as perguntas antes de finalizar o treinamento.')
      return
    }

    const { acertos, total, nota, aprovado } = calcularEstatisticas()

    try {
      setSalvando(true)
      const res = await treinamentoService.saveQuizResult({
        colaboradorId,
        documentoId,
        nomeColaborador: colaboradorNome,
        respostas,
        acertos,
        totalPerguntas: total,
        nota,
        aprovado,
      })

      setResultadoFinal(res)
      onConcluido(res)

      if (aprovado) {
        toast.success(`Parabéns! Treinamento concluído com aproveitamento de ${nota}%!`)
      } else {
        toast.error(
          `Aproveitamento de ${nota}%. É necessário atingir ao menos 70% para aprovação. Revise as respostas com os feedbacks explicativos.`,
        )
      }
    } catch (err) {
      toast.error('Erro ao salvar resultado do treinamento. Tente novamente.')
      console.error(err)
    } finally {
      setSalvando(false)
    }
  }

  const handleRefazer = () => {
    setRespostas({})
    setPerguntasVerificadas({})
    setResultadoFinal(null)
  }

  return (
    <div className="space-y-6">
      {/* Banner Superior */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/80 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-lg">Treinamento Interativo de Fixação</h3>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Responda às questões sobre <strong>{documentoTitulo}</strong> para validar sua
            compreensão e liberar o termo de assinatura e certificado.
          </p>
        </div>

        {resultadoFinal && (
          <div
            className={`px-4 py-2.5 rounded-lg border text-sm font-semibold flex items-center gap-2 ${
              resultadoFinal.aprovado
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-amber-50 border-amber-300 text-amber-800'
            }`}
          >
            {resultadoFinal.aprovado ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>
                  Aprovado com {resultadoFinal.nota}% ({resultadoFinal.acertos}/
                  {resultadoFinal.total_perguntas})
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-amber-600" />
                <span>Nota: {resultadoFinal.nota}% (Mínimo: 70%)</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Lista de Perguntas */}
      <div className="space-y-6">
        {perguntas.map((pergunta, idx) => {
          const respSelecionada = respostas[pergunta.id]
          const verificada = perguntasVerificadas[pergunta.id]
          const acertou = respSelecionada === pergunta.respostaCorreta

          return (
            <Card
              key={pergunta.id}
              className={`border transition-all shadow-sm ${
                verificada
                  ? acertou
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs">
                      {idx + 1}
                    </span>
                    <CardTitle className="text-base text-slate-900 font-semibold leading-snug">
                      {pergunta.pergunta}
                    </CardTitle>
                  </div>
                  {verificada && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        acertou ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {acertou ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorreto
                        </>
                      )}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <RadioGroup
                  value={respSelecionada !== undefined ? String(respSelecionada) : ''}
                  onValueChange={(val) => handleSelecionarOpcao(pergunta.id, Number(val))}
                  className="space-y-2"
                >
                  {pergunta.opcoes.map((opcao, optIdx) => {
                    const isSelected = respSelecionada === optIdx
                    const isCorrect = optIdx === pergunta.respostaCorreta

                    let optionClasses = 'border-slate-200 hover:bg-slate-50/80'
                    if (verificada) {
                      if (isCorrect) {
                        optionClasses =
                          'border-emerald-500 bg-emerald-50/80 font-medium text-emerald-950'
                      } else if (isSelected && !isCorrect) {
                        optionClasses = 'border-rose-400 bg-rose-50/80 text-rose-950 line-through'
                      }
                    } else if (isSelected) {
                      optionClasses = 'border-rose-500 bg-rose-50/50'
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelecionarOpcao(pergunta.id, optIdx)}
                        className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${optionClasses}`}
                      >
                        <RadioGroupItem
                          value={String(optIdx)}
                          id={`${pergunta.id}-${optIdx}`}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={`${pergunta.id}-${optIdx}`}
                          className="text-sm leading-snug cursor-pointer flex-1 font-normal"
                        >
                          {opcao}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>

                {/* Feedback Explicativo Imediato */}
                {verificada && (
                  <Alert
                    className={`mt-3 py-2.5 text-xs ${
                      acertou
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50/80 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {acertou ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <AlertTitle className="text-xs font-bold mb-0.5">
                          {acertou ? 'Muito bem! Resposta correta.' : 'Explicação e Fundamento:'}
                        </AlertTitle>
                        <AlertDescription className="text-xs leading-relaxed opacity-95">
                          {pergunta.explicacao}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Ações de Conclusão */}
      <Card className="border-slate-300 bg-slate-900 text-white shadow-md p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              Progresso do Treinamento
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {Object.keys(respostas).length} de {perguntas.length} questões respondidas.
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {resultadoFinal && !resultadoFinal.aprovado && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRefazer}
                className="border-slate-700 text-slate-200 hover:bg-slate-800 gap-1.5 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Refazer Quiz
              </Button>
            )}

            {!resultadoFinal || !resultadoFinal.aprovado ? (
              <Button
                type="button"
                disabled={salvando || !todasRespondidas}
                onClick={handleFinalizarTreinamento}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold flex-1 sm:flex-none"
              >
                {salvando ? 'Processando...' : 'Finalizar Treinamento'}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onIrParaAssinatura}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 flex-1 sm:flex-none"
              >
                Prosseguir para Assinatura <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
