import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Lock,
  Mail,
  ShieldAlert,
  CheckCircle2,
  UserCheck,
  UserPlus,
  LogIn,
  User,
  Briefcase,
  Building2,
  CreditCard,
} from 'lucide-react'
import { toast } from 'sonner'
import prafestaLogo from '@/assets/logo.582f8581-2-88ba8.webp'

interface LoginModalProps {
  onSuccess?: () => void
}

export const LoginView: React.FC<LoginModalProps> = () => {
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('login')

  // Estado do Login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Estado do Cadastro de Colaborador
  const [cadNome, setCadNome] = useState('')
  const [cadEmail, setCadEmail] = useState('')
  const [cadPassword, setCadPassword] = useState('')
  const [cadPasswordConfirm, setCadPasswordConfirm] = useState('')
  const [cadCpf, setCadCpf] = useState('')
  const [cadCargo, setCadCargo] = useState('')
  const [cadSetor, setCadSetor] = useState('')
  const [cadLoading, setCadLoading] = useState(false)
  const [cadError, setCadError] = useState('')

  // Modal de Recuperação de Senha
  const [modalForgotOpen, setModalForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    if (!email || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      toast.success('Login efetuado com sucesso!')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha na autenticação'
      if (msg.includes('Failed to authenticate') || msg.includes('400')) {
        setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais.')
      } else {
        setErrorMessage('Não foi possível conectar ao servidor. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCadError('')

    if (!cadNome.trim() || !cadEmail.trim() || !cadPassword) {
      setCadError('Preencha os campos obrigatórios (nome, e-mail e senha).')
      return
    }

    if (cadPassword.length < 8) {
      setCadError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (cadPassword !== cadPasswordConfirm) {
      setCadError('A confirmação de senha não confere.')
      return
    }

    try {
      setCadLoading(true)
      // Cadastra estritamente como "colaborador"
      await authService.registerColaborador({
        name: cadNome.trim(),
        email: cadEmail.trim(),
        password: cadPassword,
        cpf: cadCpf.trim(),
        cargo: cadCargo.trim(),
        setor: cadSetor.trim(),
      })

      toast.success('Cadastro realizado com sucesso! Conectando sua conta...')
      // Faz login automático após criar o colaborador
      await login(cadEmail.trim(), cadPassword)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha no cadastro'
      if (msg.includes('email') || msg.includes('unique') || msg.includes('400')) {
        setCadError('Este e-mail já está em uso ou é inválido. Tente outro.')
      } else {
        setCadError(msg)
      }
    } finally {
      setCadLoading(false)
    }
  }

  const handlePreencherTeste = (userEmail: string) => {
    setEmail(userEmail)
    setPassword('Skip@Pass')
    setActiveTab('login')
  }

  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return

    try {
      setForgotLoading(true)
      await authService.requestPasswordReset(forgotEmail)
      setForgotSuccess(true)
      toast.success('Solicitação enviada! Verifique sua caixa de entrada.')
    } catch {
      // Mesmo em erro ou ausência de SMTP ativo, informamos o fluxo nativo do PB
      setForgotSuccess(true)
      toast.info('Instruções registradas no sistema nativo de recuperação.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header PRAFESTA */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-4 border border-rose-100 shadow-xl">
            <img src={prafestaLogo} alt="PRAFESTA" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Portal de Assinatura Corporativa
          </h1>
          <p className="text-xs text-rose-300/90 font-mono mt-0.5 font-semibold">
            CNPJ 56.173.131/0001-25
          </p>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Documentos Normativos, Treinamentos & Termos de Adesão
          </p>
        </div>

        <Card className="border-slate-700 bg-slate-900/90 text-white shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-3">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val as 'login' | 'cadastro')
                setErrorMessage('')
                setCadError('')
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full bg-slate-800/80 p-1 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="text-xs font-semibold py-1.5 data-[state=active]:bg-rose-600 data-[state=active]:text-white gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" /> Entrar
                </TabsTrigger>
                <TabsTrigger
                  value="cadastro"
                  className="text-xs font-semibold py-1.5 data-[state=active]:bg-rose-600 data-[state=active]:text-white gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Cadastre-se
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="pt-2">
            {activeTab === 'login' ? (
              <div>
                <div className="mb-4">
                  <CardTitle className="text-lg text-white font-bold">Acesse sua conta</CardTitle>
                  <CardDescription className="text-slate-400 text-xs mt-0.5">
                    Informe seu e-mail e senha de acesso
                  </CardDescription>
                </div>

                {errorMessage && (
                  <Alert
                    variant="destructive"
                    className="mb-4 bg-rose-950/70 border-rose-800 text-rose-200 text-xs py-2"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs text-slate-300">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.nome@prafesta.com.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-sm focus-visible:ring-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pass" className="text-xs text-slate-300">
                        Senha de acesso
                      </Label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email)
                          setForgotSuccess(false)
                          setModalForgotOpen(true)
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="pass"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-sm focus-visible:ring-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 transition-colors mt-2"
                  >
                    {loading ? 'Entrando...' : 'Entrar no Portal'}
                  </Button>
                </form>

                {/* Acesso rápido para testes com os perfis do plano */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                    Contas de teste para homologação rápida:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => handlePreencherTeste('adv.gianebatista@gmail.com')}
                      className="flex items-center justify-between p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors text-left"
                    >
                      <span className="font-medium text-rose-300">
                        Giane Batista (Coordenadora RH)
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        Preencher
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreencherTeste('carlos.producao@prafesta.com.br')}
                      className="flex items-center justify-between p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors text-left"
                    >
                      <span className="font-medium">Carlos Eduardo (Colaborador - Produção)</span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        Preencher
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreencherTeste('fernanda.qualidade@prafesta.com.br')}
                      className="flex items-center justify-between p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors text-left"
                    >
                      <span className="font-medium">Fernanda Lima (Colaboradora - Qualidade)</span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        Preencher
                      </span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    Senha padrão para testes:{' '}
                    <code className="text-rose-400 bg-slate-950 px-1.5 py-0.5 rounded">
                      Skip@Pass
                    </code>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <CardTitle className="text-lg text-white font-bold">
                    Cadastro de Colaborador
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs mt-0.5">
                    Preencha seus dados para criar seu acesso como colaborador
                  </CardDescription>
                </div>

                {cadError && (
                  <Alert
                    variant="destructive"
                    className="mb-4 bg-rose-950/70 border-rose-800 text-rose-200 text-xs py-2"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription>{cadError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleCadastroSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="cad-nome" className="text-xs text-slate-300">
                      Nome completo *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="cad-nome"
                        placeholder="Ex: Roberto Silva"
                        value={cadNome}
                        onChange={(e) => setCadNome(e.target.value)}
                        className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-sm focus-visible:ring-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="cad-email" className="text-xs text-slate-300">
                      E-mail *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="cad-email"
                        type="email"
                        placeholder="roberto.silva@prafesta.com.br"
                        value={cadEmail}
                        onChange={(e) => setCadEmail(e.target.value)}
                        className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-sm focus-visible:ring-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="cad-cpf" className="text-xs text-slate-300">
                      CPF (para registro em assinaturas)
                    </Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="cad-cpf"
                        placeholder="000.000.000-00"
                        value={cadCpf}
                        onChange={(e) => setCadCpf(e.target.value)}
                        className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-sm focus-visible:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="cad-cargo" className="text-xs text-slate-300">
                        Cargo
                      </Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                          id="cad-cargo"
                          placeholder="Operador, Auxiliar..."
                          value={cadCargo}
                          onChange={(e) => setCadCargo(e.target.value)}
                          className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-xs focus-visible:ring-rose-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="cad-setor" className="text-xs text-slate-300">
                        Setor
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                          id="cad-setor"
                          placeholder="Produção, Logística..."
                          value={cadSetor}
                          onChange={(e) => setCadSetor(e.target.value)}
                          className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-xs focus-visible:ring-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="cad-pass" className="text-xs text-slate-300">
                        Senha * (min. 8)
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                          id="cad-pass"
                          type="password"
                          placeholder="••••••••"
                          value={cadPassword}
                          onChange={(e) => setCadPassword(e.target.value)}
                          className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-xs focus-visible:ring-rose-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="cad-pass-conf" className="text-xs text-slate-300">
                        Confirmar senha *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                          id="cad-pass-conf"
                          type="password"
                          placeholder="••••••••"
                          value={cadPasswordConfirm}
                          onChange={(e) => setCadPasswordConfirm(e.target.value)}
                          className="pl-9 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 text-xs focus-visible:ring-rose-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={cadLoading}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 transition-colors mt-3"
                  >
                    {cadLoading ? 'Cadastrando...' : 'Criar Conta de Colaborador'}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0 pb-4 text-center block">
            <p className="text-[11px] text-slate-400">
              PRAFESTA Indústria e Comércio de Embalagens Ltda. • CNPJ 56.173.131/0001-25
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Dialog de Recuperação de Senha */}
      <Dialog open={modalForgotOpen} onOpenChange={setModalForgotOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">Recuperação de Senha</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Digite seu e-mail cadastrado. Um link de redefinição será gerado pelo serviço de
              segurança do sistema.
            </DialogDescription>
          </DialogHeader>

          {forgotSuccess ? (
            <div className="py-4 space-y-3 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div className="text-sm font-semibold text-emerald-300">
                Instruções de redefinição processadas!
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Se o e-mail informado estiver ativo e cadastrado, verifique sua caixa de entrada e
                spam para redefinir a credencial.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRecuperarSenha} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="forgot-email" className="text-xs text-slate-300">
                  E-mail
                </Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="exemplo@prafesta.com.br"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                  required
                />
              </div>
              <DialogFooter className="mt-4 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalForgotOpen(false)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={forgotLoading}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-medium"
                >
                  {forgotLoading ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
