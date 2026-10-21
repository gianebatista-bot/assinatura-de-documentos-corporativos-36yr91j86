import pb from '@/lib/pocketbase/client'
import type { User, UserRole } from '@/types'

export const authService = {
  getCurrentUser(): User | null {
    if (!pb.authStore.isValid || !pb.authStore.record) {
      return null
    }
    const r = pb.authStore.record
    return {
      id: r.id,
      email: r.email,
      name: r.name || r.email,
      role: (r.role as UserRole) || 'colaborador',
      cargo: r.cargo || '',
      setor: r.setor || '',
      cpf: r.cpf || '',
      avatar: r.avatar || '',
      created: r.created,
      updated: r.updated,
    }
  },

  async login(email: string, pass: string): Promise<User> {
    const authData = await pb.collection('users').authWithPassword(email.trim(), pass)
    const r = authData.record
    return {
      id: r.id,
      email: r.email,
      name: r.name || r.email,
      role: (r.role as UserRole) || 'colaborador',
      cargo: r.cargo || '',
      setor: r.setor || '',
      cpf: r.cpf || '',
      avatar: r.avatar || '',
      created: r.created,
      updated: r.updated,
    }
  },

  logout(): void {
    pb.authStore.clear()
  },

  async requestPasswordReset(email: string): Promise<boolean> {
    await pb.collection('users').requestPasswordReset(email.trim())
    return true
  },

  async requestVerification(email: string): Promise<boolean> {
    await pb.collection('users').requestVerification(email.trim())
    return true
  },

  async listUsers(): Promise<User[]> {
    const records = await pb.collection('users').getFullList({
      sort: 'name',
    })
    return records.map((r) => ({
      id: r.id,
      email: r.email,
      name: r.name || r.email,
      role: (r.role as UserRole) || 'colaborador',
      cargo: r.cargo || '',
      setor: r.setor || '',
      cpf: r.cpf || '',
      avatar: r.avatar || '',
      created: r.created,
      updated: r.updated,
    }))
  },

  async createUser(data: {
    email: string
    password: string
    name: string
    role: UserRole
    cargo?: string
    setor?: string
    cpf?: string
  }): Promise<User> {
    const payload = {
      email: data.email.trim(),
      password: data.password,
      passwordConfirm: data.password,
      name: data.name.trim(),
      role: data.role,
      cargo: data.cargo || '',
      setor: data.setor || '',
      cpf: data.cpf || '',
      emailVisibility: true,
    }
    const rec = await pb.collection('users').create(payload)

    // Tentar solicitar e-mail de verificação se possível
    try {
      await pb.collection('users').requestVerification(data.email.trim())
    } catch {
      // Ignora se o SMTP não estiver configurado no PocketBase
    }

    return {
      id: rec.id,
      email: rec.email,
      name: rec.name || rec.email,
      role: (rec.role as UserRole) || 'colaborador',
      cargo: rec.cargo || '',
      setor: rec.setor || '',
      cpf: rec.cpf || '',
      avatar: rec.avatar || '',
      created: rec.created,
      updated: rec.updated,
    }
  },

  async registerColaborador(data: {
    email: string
    password: string
    name: string
    cpf?: string
    cargo?: string
    setor?: string
  }): Promise<User> {
    // Forçar estritamente o papel "colaborador" para impedir criação de conta de coordenadora
    return this.createUser({
      ...data,
      role: 'colaborador',
    })
  },

  async updateUser(
    id: string,
    data: Partial<{
      name: string
      role: UserRole
      cargo: string
      setor: string
      cpf: string
    }>,
  ): Promise<User> {
    const rec = await pb.collection('users').update(id, data)
    return {
      id: rec.id,
      email: rec.email,
      name: rec.name || rec.email,
      role: (rec.role as UserRole) || 'colaborador',
      cargo: rec.cargo || '',
      setor: rec.setor || '',
      cpf: rec.cpf || '',
      avatar: rec.avatar || '',
      created: rec.created,
      updated: rec.updated,
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    await pb.collection('users').delete(id)
    return true
  },
}
