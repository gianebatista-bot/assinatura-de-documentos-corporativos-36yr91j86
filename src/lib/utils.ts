/* General utility functions (exposes cn) */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Anonimiza/mascara o CPF para cumprimento da LGPD.
 * Oculta os primeiros dígitos e exibe apenas os dígitos finais no formato:
 * ***.***.XXX-XX (ou ***.***.***-XX se informado com 11 dígitos, padrão: ***.***.XXX-XX / ***.***.789-00)
 * Aceita entradas com ou sem pontuação (ex: '123.456.789-00' ou '12345678900').
 */
export function mascararCPF(cpf?: string | null): string {
  if (!cpf) return ''
  const trimmed = cpf.trim()
  if (!trimmed) return ''

  // Extrair apenas dígitos
  const digitos = trimmed.replace(/\D/g, '')

  // Se tem 11 dígitos padrão
  if (digitos.length === 11) {
    const d7a9 = digitos.slice(6, 9)
    const d10a11 = digitos.slice(9, 11)
    return `***.***.${d7a9}-${d10a11}`
  }

  // Se tiver pontuação padrão '000.000.000-00'
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(trimmed)) {
    return `***.***.${trimmed.slice(8)}`
  }

  // Caso tenha tamanho atípico ou parcial
  if (digitos.length >= 5) {
    const ultimos5 = digitos.slice(-5)
    return `***.***.${ultimos5.slice(0, 3)}-${ultimos5.slice(3)}`
  }

  // Se for muito curto ou mascarado
  if (trimmed.includes('*')) return trimmed
  return '***.***.***-**'
}
