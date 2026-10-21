import React, { useState } from 'react'
import type { User, UserRole } from '@/types'
import { authService } from '@/services/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Search, Edit2, Trash2, Mail, Shield, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { mascararCPF } from '@/lib/utils'

interface GestaoColaboradoresProps {
  usuarios: User[]
  onRecarregar: () => void
}

export const GestaoColaboradores: React.FC<GestaoColaboradoresProps> = ({
  usuarios,
  onRecarregar,
}) => {
  const [busca, setBusca] = useState('')
  const [filtroPapel, setFiltroPapel] = useState<string>('todos')

  // Modal Novo / Editar
  const [modalOpen, setModalOpen] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('Skip@Pass')
  const [papel, setPapel] = useState<UserRole>('colaborador')
  const [setor, setSetor] = useState('')
  const [cpf, setCpf] = useState('')
  const [salvando, setSalvando] = useState(false)

  const abrirModalCriar = () => {
    setEditandoId(null)
    setNome('')
    setEmail('')
    setSenha('Skip@Pass')
    setPapel('colaborador')
    setSetor('')
    setCpf('')
    setModalOpen(true)
  }

  const abrirModalEditar = (u: User) => {
    setEditandoId(u.id)
    setNome(u.name)
    setEmail(u.email)
    setSenha('')
    setPapel(u.role)
    setSetor(u.setor || '')
    setCpf(u.cpf || '')
    setModalOpen(true)
  }

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !email.trim()) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }

    try {
      setSalvando(true)
      if (editandoId) {
        await authService.updateUser(editandoId, {
          name: nome,
          role: papel,
          setor,
          cpf,
        })
        toast.success('Colaborador atualizado com sucesso!')
      } else {
        if (!senha || senha.length < 8) {
          toast.error('A senha inicial deve ter no mínimo 8 caracteres.')
          return
        }
        await authService.createUser({
          name: nome,
          email,
          password: senha,
          role: papel,
          setor,
          cpf,
        })
        toast.success('Colaborador cadastrado! E-mail de boas-vindas acionado no sistema.')
      }
      setModalOpen(false)
      onRecarregar()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar colaborador'
      toast.error(msg)
      console.error(err)
    } finally {
      setSalvando(false)
    }
  }

  const handleExcluir = async (u: User) => {
    if (confirm(`Tem certeza que deseja remover o colaborador ${u.name}?`)) {
      try {
        await authService.deleteUser(u.id)
        toast.success('Colaborador removido.')
        onRecarregar()
      } catch (err) {
        toast.error('Erro ao remover usuário.')
        console.error(err)
      }
    }
  }

  const filtrados = usuarios.filter((u) => {
    const matchBusca =
      u.name.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase()) ||
      (u.setor && u.setor.toLowerCase().includes(busca.toLowerCase()))

    if (!matchBusca) return false
    if (filtroPapel === 'todos') return true
    return u.role === filtroPapel
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome, e-mail, setor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 bg-white border-slate-300 text-sm"
            />
          </div>

          <Select value={filtroPapel} onValueChange={setFiltroPapel}>
            <SelectTrigger className="w-[170px] bg-white border-slate-300 text-xs">
              <SelectValue placeholder="Perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os perfis</SelectItem>
              <SelectItem value="colaborador">Colaboradores</SelectItem>
              <SelectItem value="coordenadora">Coordenadoras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={abrirModalCriar}
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-1.5 text-xs"
        >
          <UserPlus className="w-4 h-4" /> Novo Colaborador
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-xs font-bold text-slate-700">Colaborador</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">Setor</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">CPF (LGPD)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">Perfil</TableHead>
              <TableHead className="text-xs font-bold text-slate-700 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-slate-500">
                  Nenhum colaborador encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map((u) => (
                <TableRow key={u.id} className="hover:bg-slate-50/70">
                  <TableCell>
                    <div className="font-semibold text-slate-900 text-sm">{u.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {u.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-700">
                    <span className="font-medium">{u.setor || 'Geral'}</span>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-slate-600">
                    {u.cpf ? mascararCPF(u.cpf) : 'Não informado'}
                  </TableCell>
                  <TableCell>
                    {u.role === 'coordenadora' ? (
                      <Badge className="bg-rose-600 text-white text-[10px] gap-1">
                        <Shield className="w-3 h-3" /> Coordenadora
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 text-[10px] gap-1"
                      >
                        <UserIcon className="w-3 h-3" /> Colaborador
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => abrirModalEditar(u)}
                        className="h-8 w-8 text-slate-600 hover:text-slate-900"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExcluir(u)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog Criar / Editar Colaborador */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editandoId ? 'Editar Colaborador' : 'Cadastrar Novo Colaborador'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {editandoId
                ? 'Atualize as informações funcionais do colaborador.'
                : 'Defina os dados para criação de login e emissão de assinaturas corporativas.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSalvar} className="space-y-3 py-2 text-xs">
            <div className="space-y-1">
              <Label htmlFor="nome" className="text-xs font-semibold">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João Silva da Rocha"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-semibold">
                E-mail Corporativo *
              </Label>
              <Input
                id="email"
                type="email"
                disabled={Boolean(editandoId)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joao.silva@prafesta.com.br"
                required
              />
            </div>

            {!editandoId && (
              <div className="space-y-1">
                <Label htmlFor="senha" className="text-xs font-semibold">
                  Senha Inicial (mínimo 8 caracteres) *
                </Label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Skip@Pass"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="cpf" className="text-xs font-semibold">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Papel no Sistema</Label>
                <Select value={papel} onValueChange={(val) => setPapel(val as UserRole)}>
                  <SelectTrigger className="text-xs bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colaborador">Colaborador</SelectItem>
                    <SelectItem value="coordenadora">Coordenadora (RH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="setor" className="text-xs font-semibold">
                Setor *
              </Label>
              <Input
                id="setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                placeholder="Ex: Produção, Qualidade, Logística, TI..."
              />
            </div>

            <DialogFooter className="mt-4 gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={salvando}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
              >
                {salvando
                  ? 'Salvando...'
                  : editandoId
                    ? 'Atualizar Dados'
                    : 'Cadastrar Colaborador'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
