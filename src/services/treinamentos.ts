import pb from '@/lib/pocketbase/client'
import type { Treinamento } from '@/types'

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

export const treinamentoService = {
  async listByUser(userId: string): Promise<Treinamento[]> {
    const records = await pb.collection('treinamentos').getFullList({
      filter: `colaborador = '${userId}'`,
      expand: 'documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      respostas: parseJsonField<Record<string, number>>(r.respostas, {}),
      nota: Number(r.nota) || 0,
      acertos: Number(r.acertos) || 0,
      total_perguntas: Number(r.total_perguntas) || 0,
      aprovado: Boolean(r.aprovado),
      data_conclusao: r.data_conclusao,
      nome_colaborador: r.nome_colaborador || '',
      created: r.created,
      updated: r.updated,
    }))
  },

  async listByDocument(documentoId: string): Promise<Treinamento[]> {
    const records = await pb.collection('treinamentos').getFullList({
      filter: `documento = '${documentoId}'`,
      expand: 'colaborador,documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      respostas: parseJsonField<Record<string, number>>(r.respostas, {}),
      nota: Number(r.nota) || 0,
      acertos: Number(r.acertos) || 0,
      total_perguntas: Number(r.total_perguntas) || 0,
      aprovado: Boolean(r.aprovado),
      data_conclusao: r.data_conclusao,
      nome_colaborador: r.nome_colaborador || '',
      created: r.created,
      updated: r.updated,
    }))
  },

  async listAll(): Promise<Treinamento[]> {
    const records = await pb.collection('treinamentos').getFullList({
      expand: 'colaborador,documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      respostas: parseJsonField<Record<string, number>>(r.respostas, {}),
      nota: Number(r.nota) || 0,
      acertos: Number(r.acertos) || 0,
      total_perguntas: Number(r.total_perguntas) || 0,
      aprovado: Boolean(r.aprovado),
      data_conclusao: r.data_conclusao,
      nome_colaborador: r.nome_colaborador || '',
      created: r.created,
      updated: r.updated,
    }))
  },

  async getByUserAndDocument(userId: string, docId: string): Promise<Treinamento | null> {
    try {
      const r = await pb
        .collection('treinamentos')
        .getFirstListItem(`colaborador = '${userId}' && documento = '${docId}'`)
      return {
        id: r.id,
        colaborador: r.colaborador,
        documento: r.documento,
        respostas: parseJsonField<Record<string, number>>(r.respostas, {}),
        nota: Number(r.nota) || 0,
        acertos: Number(r.acertos) || 0,
        total_perguntas: Number(r.total_perguntas) || 0,
        aprovado: Boolean(r.aprovado),
        data_conclusao: r.data_conclusao,
        nome_colaborador: r.nome_colaborador || '',
        created: r.created,
        updated: r.updated,
      }
    } catch {
      return null
    }
  },

  async saveQuizResult(data: {
    colaboradorId: string
    documentoId: string
    nomeColaborador: string
    respostas: Record<string, number>
    acertos: number
    totalPerguntas: number
    nota: number
    aprovado: boolean
  }): Promise<Treinamento> {
    const nowIso = new Date().toISOString()
    const existing = await this.getByUserAndDocument(data.colaboradorId, data.documentoId)

    const payload = {
      colaborador: data.colaboradorId,
      documento: data.documentoId,
      respostas: JSON.stringify(data.respostas),
      acertos: data.acertos,
      total_perguntas: data.totalPerguntas,
      nota: data.nota,
      aprovado: data.aprovado,
      data_conclusao: nowIso,
      nome_colaborador: data.nomeColaborador,
    }

    if (existing) {
      const r = await pb.collection('treinamentos').update(existing.id, payload)
      return {
        id: r.id,
        colaborador: r.colaborador,
        documento: r.documento,
        respostas: data.respostas,
        nota: data.nota,
        acertos: data.acertos,
        total_perguntas: data.totalPerguntas,
        aprovado: data.aprovado,
        data_conclusao: nowIso,
        nome_colaborador: data.nomeColaborador,
        created: r.created,
        updated: r.updated,
      }
    }

    const r = await pb.collection('treinamentos').create(payload)
    return {
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      respostas: data.respostas,
      nota: data.nota,
      acertos: data.acertos,
      total_perguntas: data.totalPerguntas,
      aprovado: data.aprovado,
      data_conclusao: nowIso,
      nome_colaborador: data.nomeColaborador,
      created: r.created,
      updated: r.updated,
    }
  },
}
