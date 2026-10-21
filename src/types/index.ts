export type UserRole = 'coordenadora' | 'colaborador'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  cargo?: string
  setor?: string
  cpf?: string
  avatar?: string
  created: string
  updated: string
}

export interface SecaoDocumento {
  numero: string
  titulo: string
  conteudo: string
}

export interface PerguntaQuiz {
  id: string
  pergunta: string
  opcoes: string[]
  respostaCorreta: number
  explicacao: string
}

export interface Documento {
  id: string
  titulo: string
  subtitulo?: string
  codigo?: string
  revisao?: string
  data_publicacao?: string
  ementa?: string
  conteudo?: string
  secoes?: SecaoDocumento[]
  declaracao_verbatim?: string
  local_padrao?: string
  perguntas_quiz?: PerguntaQuiz[]
  ativo: boolean
  ordem?: number
  created: string
  updated: string
}

export interface MetadadosAssinatura {
  ip?: string
  userAgent?: string
  dispositivo?: string
  metodo?: string
  validacaoLegal?: string
  resolucaoTela?: string
  navegador?: string
}

export interface Assinatura {
  id: string
  colaborador: string
  documento: string
  data_hora: string
  ciencia: boolean
  nome_colaborador?: string
  cpf_colaborador?: string
  email_colaborador?: string
  cargo_colaborador?: string
  termo_assinado_texto?: string
  metadados?: MetadadosAssinatura
  expand?: {
    colaborador?: User
    documento?: Documento
  }
  created: string
  updated: string
}

export interface Treinamento {
  id: string
  colaborador: string
  documento: string
  respostas: Record<string, number>
  nota: number
  acertos: number
  total_perguntas: number
  aprovado: boolean
  data_conclusao: string
  nome_colaborador?: string
  expand?: {
    colaborador?: User
    documento?: Documento
  }
  created: string
  updated: string
}

export interface DocumentoComStatus extends Documento {
  minhaAssinatura?: Assinatura | null
  meuTreinamento?: Treinamento | null
  status: 'pendente' | 'treinamento_concluido' | 'assinado'
}
