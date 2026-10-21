import React, { createContext, useContext, useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { authService } from '@/services/auth'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, pass: string) => Promise<User>
  logout: () => void
  refreshUser: () => void
  isCoordenadora: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())
  const [loading, setLoading] = useState(true)

  const refreshUser = () => {
    setUser(authService.getCurrentUser())
  }

  useEffect(() => {
    setUser(authService.getCurrentUser())
    setLoading(false)

    // Ouvir alterações de authStore
    const unsub = pb.authStore.onChange(() => {
      setUser(authService.getCurrentUser())
    })

    return () => {
      unsub()
    }
  }, [])

  const login = async (email: string, pass: string) => {
    const logged = await authService.login(email, pass)
    setUser(logged)
    return logged
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const isCoordenadora = user?.role === 'coordenadora'

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        isCoordenadora,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
