import pb from '@/lib/pocketbase/client'
import type { Assinatura, MetadadosAssinatura } from '@/types'

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

export const assinaturaService = {
  async listByUser(userId: string): Promise<Assinatura[]> {
    const records = await pb.collection('assinaturas').getFullList({
      filter: `colaborador = '${userId}'`,
      expand: 'documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      data_hora: r.data_hora,
      ciencia: Boolean(r.ciencia),
      nome_colaborador: r.nome_colaborador || '',
      cpf_colaborador: r.cpf_colaborador || '',
      email_colaborador: r.email_colaborador || '',
      cargo_colaborador: r.cargo_colaborador || '',
      instagram: r.instagram || '',
      termo_assinado_texto: r.termo_assinado_texto || '',
      metadados: parseJsonField<MetadadosAssinatura>(r.metadados, {}),
      created: r.created,
      updated: r.updated,
    }))
  },

  async listByDocument(documentoId: string): Promise<Assinatura[]> {
    const records = await pb.collection('assinaturas').getFullList({
      filter: `documento = '${documentoId}'`,
      expand: 'colaborador,documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      data_hora: r.data_hora,
      ciencia: Boolean(r.ciencia),
      nome_colaborador: r.nome_colaborador || '',
      cpf_colaborador: r.cpf_colaborador || '',
      email_colaborador: r.email_colaborador || '',
      cargo_colaborador: r.cargo_colaborador || '',
      instagram: r.instagram || '',
      termo_assinado_texto: r.termo_assinado_texto || '',
      metadados: parseJsonField<MetadadosAssinatura>(r.metadados, {}),
      created: r.created,
      updated: r.updated,
    }))
  },

  async listAll(): Promise<Assinatura[]> {
    const records = await pb.collection('assinaturas').getFullList({
      expand: 'colaborador,documento',
      sort: '-created',
    })
    return records.map((r) => ({
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      data_hora: r.data_hora,
      ciencia: Boolean(r.ciencia),
      nome_colaborador: r.nome_colaborador || '',
      cpf_colaborador: r.cpf_colaborador || '',
      email_colaborador: r.email_colaborador || '',
      cargo_colaborador: r.cargo_colaborador || '',
      instagram: r.instagram || '',
      termo_assinado_texto: r.termo_assinado_texto || '',
      metadados: parseJsonField<MetadadosAssinatura>(r.metadados, {}),
      created: r.created,
      updated: r.updated,
    }))
  },

  async getByUserAndDocument(userId: string, docId: string): Promise<Assinatura | null> {
    try {
      const r = await pb
        .collection('assinaturas')
        .getFirstListItem(`colaborador = '${userId}' && documento = '${docId}'`)
      return {
        id: r.id,
        colaborador: r.colaborador,
        documento: r.documento,
        data_hora: r.data_hora,
        ciencia: Boolean(r.ciencia),
        nome_colaborador: r.nome_colaborador || '',
        cpf_colaborador: r.cpf_colaborador || '',
        email_colaborador: r.email_colaborador || '',
        cargo_colaborador: r.cargo_colaborador || '',
        instagram: r.instagram || '',
        termo_assinado_texto: r.termo_assinado_texto || '',
        metadados: parseJsonField<MetadadosAssinatura>(r.metadados, {}),
        created: r.created,
        updated: r.updated,
      }
    } catch {
      return null
    }
  },

  async create(data: {
    colaboradorId: string
    documentoId: string
    nomeColaborador: string
    cpfColaborador: string
    emailColaborador: string
    cargoColaborador: string
    instagram?: string
    termoTexto: string
    metadados?: MetadadosAssinatura
  }): Promise<Assinatura> {
    const nowIso = new Date().toISOString()
    const metadados: MetadadosAssinatura = {
      ip: '127.0.0.1 (Web client)',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Navegador Web',
      dispositivo:
        typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
      metodo: 'Assinatura Eletrônica com Autenticação de Usuário e Registro de Ciência Plena',
      validacaoLegal:
        'MP nº 2.200-2/2001, Código Civil arts. 107/219 e Lei 12.965/2014 (Marco Civil da Internet)',
      ...data.metadados,
    }

    const payload: Record<string, unknown> = {
      colaborador: data.colaboradorId,
      documento: data.documentoId,
      data_hora: nowIso,
      ciencia: true,
      nome_colaborador: data.nomeColaborador,
      cpf_colaborador: data.cpfColaborador,
      email_colaborador: data.emailColaborador,
      cargo_colaborador: data.cargoColaborador,
      termo_assinado_texto: data.termoTexto,
      metadados: JSON.stringify(metadados),
    }

    if (data.instagram !== undefined) {
      payload.instagram = data.instagram.trim()
    }

    const r = await pb.collection('assinaturas').create(payload)
    return {
      id: r.id,
      colaborador: r.colaborador,
      documento: r.documento,
      data_hora: r.data_hora,
      ciencia: Boolean(r.ciencia),
      nome_colaborador: r.nome_colaborador || '',
      cpf_colaborador: r.cpf_colaborador || '',
      email_colaborador: r.email_colaborador || '',
      cargo_colaborador: r.cargo_colaborador || '',
      instagram: r.instagram || '',
      termo_assinado_texto: r.termo_assinado_texto || '',
      metadados,
      created: r.created,
      updated: r.updated,
    }
  },
}
