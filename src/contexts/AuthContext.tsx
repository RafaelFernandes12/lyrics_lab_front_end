'use client'

import { userProps } from '@/models/userProps'
import { getUser } from '@/operations/auth/getUser'
import { login } from '@/operations/auth/login'
import { setCookie } from 'nookies'
import { createContext, ReactNode, useState } from 'react'

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

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await login(email, password)
      const token = response.jwt

      if (!token) {
        alert('Erro ao fazer login.')
        return
      }

      setCookie(null, 'lltoken', token, {
        maxAge: 24 * 60 * 60,
      })

      const user = (await getUser(token)) || null
      setUser(user)

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
