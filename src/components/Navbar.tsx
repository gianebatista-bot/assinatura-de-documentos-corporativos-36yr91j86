import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, LogOut, Shield, User as UserIcon } from 'lucide-react'

interface NavbarProps {
  onIrParaHome?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onIrParaHome }) => {
  const { user, logout, isCoordenadora } = useAuth()

  if (!user) return null

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={onIrParaHome}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="p-2 bg-rose-600 rounded-lg group-hover:bg-rose-500 transition-colors">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight leading-none">
              PRA<span className="text-rose-500">FESTA</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">
              Assinatura de Documentos Corporativos
            </div>
          </div>
        </button>

        {/* User profile & actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5 justify-end">
              {user.name}
              {isCoordenadora ? (
                <Badge className="bg-rose-600 text-white text-[10px] px-1.5 py-0">
                  <Shield className="w-2.5 h-2.5 mr-0.5" /> RH / Coordenação
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0"
                >
                  <UserIcon className="w-2.5 h-2.5 mr-0.5" /> Colaborador
                </Badge>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {user.cargo ? `${user.cargo} • ` : ''}
              {user.email}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs gap-1.5"
            title="Sair da conta"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
