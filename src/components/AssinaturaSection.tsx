import React, { useState } from 'react'
import type { Documento, Assinatura, User } from '@/types'
import { assinaturaService } from '@/services/assinaturas'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  CheckCircle2,
  ShieldCheck,
  PenLine,
  FileCheck,
  Lock,
  Instagram,
  Download,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { gerarHTMLDocumentoAssinado, baixarArquivoHTML } from '@/lib/documentGenerators'
import { mascararCPF } from '@/lib/utils'

interface AssinaturaSectionProps {
  documento: Documento
  usuario: User
  assinaturaExistente?: Assinatura | null
  treinamentoConcluido: boolean
  onAssinado: (ass: Assinatura) => void
  onVoltarTreinamento: () => void
}

export const AssinaturaSection: React.FC<AssinaturaSectionProps> = ({
  documento,
  usuario,
  assinaturaExistente,
  treinamentoConcluido,
  onAssinado,
  onVoltarTreinamento,
}) => {
  const [concordou, setConcordou] = useState(Boolean(assinaturaExistente))
  const [assinando, setAssinando] = useState(false)
  const [assinatura, setAssinatura] = useState<Assinatura | null>(assinaturaExistente || null)
  const [instagram, setInstagram] = useState(assinaturaExistente?.instagram || '')

  // O campo de Instagram aparece APENAS no Termo Unificado (código TU-RH-023 ou título correspondente)
  const isTermoUnificado =
    documento.codigo === 'TU-RH-023' || documento.titulo.toLowerCase().includes('termo unificado')

  const localAtual = documento.local_padrao || 'Atibaia / Mairiporã'
  const dataHojeExtenso = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleAssinar = async () => {
    if (!concordou) {
      toast.warning('É necessário marcar a confirmação de leitura e concordância antes de assinar.')
      return
    }

    try {
      setAssinando(true)
      const instagramValue = isTermoUnificado && instagram.trim() ? instagram.trim() : undefined

      const res = await assinaturaService.create({
        colaboradorId: usuario.id,
        documentoId: documento.id,
        nomeColaborador: usuario.name,
        cpfColaborador: usuario.cpf || '',
        emailColaborador: usuario.email,
        cargoColaborador: usuario.cargo || '',
        instagram: instagramValue,
        termoTexto: documento.declaracao_verbatim || '',
        metadados: {
          ip: 'Client Web',
          navegador: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          metodo: 'Assinatura Eletrônica PRAFESTA com credencial autenticada e ciência inequívoca',
          validacaoLegal: 'MP nº 2.200-2/2001 art. 10 e Código Civil arts. 107/219',
        },
      })

      setAssinatura(res)
      onAssinado(res)
      toast.success('Documento assinado com sucesso com registro de data e hora!')
    } catch (err) {
      toast.error('Erro ao registrar assinatura eletrônica. Tente novamente.')
      console.error(err)
    } finally {
      setAssinando(false)
    }
  }

  const handleBaixarDocumentoAssinado = () => {
    if (!assinatura) return
    const html = gerarHTMLDocumentoAssinado({
      documento,
      assinatura,
      usuario,
    })
    const nomeSanitizado = documento.titulo
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 30)
    baixarArquivoHTML(`prafesta-documento-assinado-${nomeSanitizado}.html`, html)
    toast.success('Arquivo comprobatório do documento assinado baixado com sucesso!')
  }

  return (
    <div className="space-y-6">
      {/* Alerta se treinamento não estiver concluído */}
      {!treinamentoConcluido && !assinatura && (
        <Alert className="bg-amber-50 border-amber-300 text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="font-bold text-sm">Treinamento Interativo Pendente</AlertTitle>
          <AlertDescription className="text-xs mt-1">
            Recomenda-se realizar e concluir o treinamento interativo de fixação antes de emitir a
            assinatura e gerar o certificado digital.
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onVoltarTreinamento}
                className="bg-white border-amber-400 text-amber-800 hover:bg-amber-100 text-xs"
              >
                Ir para o Treinamento
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Caixa do Termo Verbatim */}
      <Card className="border-slate-300 shadow-sm bg-white">
        <CardHeader className="border-b bg-slate-50/70 pb-4">
          <div className="flex items-center gap-2 text-rose-600">
            <Lock className="w-5 h-5" />
            <CardTitle className="text-lg text-slate-900 font-bold">
              Declaração Formal de Adesão e Ciência (Texto Verbatim)
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-600">
            O texto a seguir é a declaração jurídica vinculativa oficial da PRAFESTA que será
            assinada eletronicamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200/80 font-serif text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
            {documento.declaracao_verbatim ||
              'Declaro ter lido e compreendido integralmente todas as disposições deste documento.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs border-t text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">Colaborador:</span> {usuario.name}
            </div>
            <div>
              <span className="font-semibold text-slate-800">CPF (LGPD):</span>{' '}
              {usuario.cpf ? mascararCPF(usuario.cpf) : 'Cadastrado no RH'}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Setor:</span>{' '}
              {usuario.setor || 'Geral'}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Local e Data:</span> {localAtual},{' '}
              {dataHojeExtenso}
            </div>
            {assinatura?.instagram && (
              <div className="md:col-span-2 flex items-center gap-1.5 text-pink-700 bg-pink-50 p-2 rounded border border-pink-200">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span className="font-semibold">Conta do Instagram informada:</span>{' '}
                <span className="font-mono">{assinatura.instagram}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4 bg-slate-50 border-t pt-5">
          {!assinatura ? (
            <>
              {/* Campo opcional de Instagram - APENAS no Termo Unificado */}
              {isTermoUnificado && (
                <div className="w-full p-3.5 bg-gradient-to-r from-pink-50/70 to-rose-50/70 rounded-lg border border-pink-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <Label
                      htmlFor="instagram-input"
                      className="text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      Conta do Instagram (opcional)
                    </Label>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Para colaboradores que possuem perfil no Instagram e desejam vincular à
                    assinatura do Termo Unificado (política de mídia social e imagem corporativa).
                  </p>
                  <div className="max-w-md">
                    <Input
                      id="instagram-input"
                      type="text"
                      placeholder="@seu.usuario"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      disabled={assinando}
                      className="bg-white border-pink-300 text-xs focus-visible:ring-pink-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-slate-200 w-full">
                <Checkbox
                  id="concordo-check"
                  checked={concordou}
                  onCheckedChange={(checked) => setConcordou(Boolean(checked))}
                  className="mt-0.5 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                />
                <label
                  htmlFor="concordo-check"
                  className="text-xs leading-relaxed font-medium text-slate-800 cursor-pointer"
                >
                  Li integralmente o documento acima, compreendi todas as diretrizes, normas,
                  responsabilidades e sanções aplicáveis e confirmo minha adesão e ciência
                  inequívoca nos termos da legislação brasileira.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                <div className="text-[11px] text-slate-500">
                  Ao clicar em <strong>Assinar Documento Eletronicamente</strong>, o sistema
                  registrará seu nome, CPF, e-mail institucional, data e carimbo de hora.
                </div>
                <Button
                  onClick={handleAssinar}
                  disabled={!concordou || assinando}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-2 w-full sm:w-auto shadow-md"
                >
                  <PenLine className="w-4 h-4 mr-2" />
                  {assinando ? 'Registrando Assinatura...' : 'Assinar Documento Eletronicamente'}
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">
                      Documento Assinado com Sucesso
                    </h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Assinado por <strong>{assinatura.nome_colaborador || usuario.name}</strong> em{' '}
                      {new Date(assinatura.data_hora).toLocaleString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                      })}
                      .
                    </p>
                    <div className="text-[10px] text-emerald-700 font-mono mt-1">
                      ID Comprobatório: {assinatura.id}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleBaixarDocumentoAssinado}
                  className="border-emerald-600 text-emerald-800 hover:bg-emerald-100 gap-2 text-xs font-semibold shrink-0"
                >
                  <Download className="w-4 h-4" /> Baixar Documento Assinado
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
