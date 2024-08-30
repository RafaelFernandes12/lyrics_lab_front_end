'use client'

import { userProps } from '@/models/userProps'
import { login } from '@/operations/auth/login'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

interface SignInData {
  email: string
  password: string
}

type AuthContextType = {
  user: userProps | null
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await login(email, password)
      const user = response.user

      setUser(user)
      sessionStorage.setItem('user', JSON.stringify(user))

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
