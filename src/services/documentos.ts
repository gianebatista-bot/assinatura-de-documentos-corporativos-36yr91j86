import pb from '@/lib/pocketbase/client'
import type { Documento, DocumentoComStatus, PerguntaQuiz, SecaoDocumento } from '@/types'
import { assinaturaService } from './assinaturas'
import { treinamentoService } from './treinamentos'

function parseJsonField<T>(val: unknown, fallback: T): T {
  if (!val) return fallback
  if (typeof val === 'object') return val as T
  if (typeof val === 'string') {
    try {
      return JSON.parse(val) as T
    } catch {
      return fallback
    }
  }
  return fallback
}

export const documentoService = {
  async listAll(onlyActive = true): Promise<Documento[]> {
    const filter = onlyActive ? 'ativo = true' : ''
    const records = await pb.collection('documentos').getFullList({
      filter,
      sort: 'ordem,created',
    })

    return records.map((r) => ({
      id: r.id,
      titulo: r.titulo,
      subtitulo: r.subtitulo || '',
      codigo: r.codigo || '',
      revisao: r.revisao || '',
      data_publicacao: r.data_publicacao || '',
      ementa: r.ementa || '',
      conteudo: r.conteudo || '',
      secoes: parseJsonField<SecaoDocumento[]>(r.secoes, []),
      declaracao_verbatim: r.declaracao_verbatim || '',
      local_padrao: r.local_padrao || '',
      perguntas_quiz: parseJsonField<PerguntaQuiz[]>(r.perguntas_quiz, []),
      ativo: Boolean(r.ativo),
      ordem: Number(r.ordem) || 0,
      created: r.created,
      updated: r.updated,
    }))
  },

  async getById(id: string): Promise<Documento> {
    const r = await pb.collection('documentos').getOne(id)
    return {
      id: r.id,
      titulo: r.titulo,
      subtitulo: r.subtitulo || '',
      codigo: r.codigo || '',
      revisao: r.revisao || '',
      data_publicacao: r.data_publicacao || '',
      ementa: r.ementa || '',
      conteudo: r.conteudo || '',
      secoes: parseJsonField<SecaoDocumento[]>(r.secoes, []),
      declaracao_verbatim: r.declaracao_verbatim || '',
      local_padrao: r.local_padrao || '',
      perguntas_quiz: parseJsonField<PerguntaQuiz[]>(r.perguntas_quiz, []),
      ativo: Boolean(r.ativo),
      ordem: Number(r.ordem) || 0,
      created: r.created,
      updated: r.updated,
    }
  },

  async listForColaborador(userId: string): Promise<DocumentoComStatus[]> {
    const docs = await this.listAll(true)
    const assinaturas = await assinaturaService.listByUser(userId)
    const treinamentos = await treinamentoService.listByUser(userId)

    const assMap = new Map(assinaturas.map((a) => [a.documento, a]))
    const trMap = new Map(treinamentos.map((t) => [t.documento, t]))

    return docs.map((doc) => {
      const minhaAssinatura = assMap.get(doc.id) || null
      const meuTreinamento = trMap.get(doc.id) || null

      let status: 'pendente' | 'treinamento_concluido' | 'assinado' = 'pendente'
      if (minhaAssinatura) {
        status = 'assinado'
      } else if (meuTreinamento && meuTreinamento.aprovado) {
        status = 'treinamento_concluido'
      }

      return {
        ...doc,
        minhaAssinatura,
        meuTreinamento,
        status,
      }
    })
  },

  async create(data: {
    titulo: string
    subtitulo?: string
    codigo?: string
    revisao?: string
    data_publicacao?: string
    ementa?: string
    secoes?: SecaoDocumento[]
    declaracao_verbatim?: string
    local_padrao?: string
    perguntas_quiz?: PerguntaQuiz[]
    ativo?: boolean
    ordem?: number
  }): Promise<Documento> {
    const payload = {
      titulo: data.titulo,
      subtitulo: data.subtitulo || '',
      codigo: data.codigo || '',
      revisao: data.revisao || '',
      data_publicacao: data.data_publicacao || new Date().toLocaleDateString('pt-BR'),
      ementa: data.ementa || '',
      conteudo: data.ementa || '',
      secoes: JSON.stringify(data.secoes || []),
      declaracao_verbatim: data.declaracao_verbatim || '',
      local_padrao: data.local_padrao || 'Atibaia/SP',
      perguntas_quiz: JSON.stringify(data.perguntas_quiz || []),
      ativo: data.ativo ?? true,
      ordem: data.ordem || 99,
    }
    const r = await pb.collection('documentos').create(payload)
    return this.getById(r.id)
  },

  async update(
    id: string,
    data: Partial<{
      titulo: string
      subtitulo: string
      codigo: string
      revisao: string
      data_publicacao: string
      ementa: string
      secoes: SecaoDocumento[]
      declaracao_verbatim: string
      local_padrao: string
      perguntas_quiz: PerguntaQuiz[]
      ativo: boolean
      ordem: number
    }>,
  ): Promise<Documento> {
    const payload: Record<string, unknown> = { ...data }
    if (data.secoes) {
      payload.secoes = JSON.stringify(data.secoes)
    }
    if (data.perguntas_quiz) {
      payload.perguntas_quiz = JSON.stringify(data.perguntas_quiz)
    }
    if (data.ementa) {
      payload.conteudo = data.ementa
    }
    await pb.collection('documentos').update(id, payload)
    return this.getById(id)
  },

  async delete(id: string): Promise<boolean> {
    await pb.collection('documentos').delete(id)
    return true
  },
}
