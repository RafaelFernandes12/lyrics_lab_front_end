'use client'

import { userProps } from '@/models/userProps'

import { getUser } from '@/operations/auth/getUser'
import { login } from '@/operations/auth/login'
import { logout } from '@/operations/auth/logout'
import { useRouter } from 'next/navigation'
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
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser()
      setUser(fetchedUser)
    }

    fetchUser()
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await login(email, password)
      const user = response.user

      setUser(user)

      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  async function signOut() {
    await logout()
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
