'use client'

import { verifySession } from '@/services/axios'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await verifySession()

        if (!isAuthenticated) {
          router.push('/login')
        } else {
          setIsVerified(true)
        }
      } catch (error) {
        console.error('Error verifying session:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  // Mostra um loading enquanto verifica
  if (isVerified === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin className="h-12 w-12" />
      </div>
    )
  }

  // Se a verificação falhou, não renderiza nada (já será redirecionado)
  if (!isVerified) {
    return null
  }

  // Só renderiza os children após verificação bem-sucedida
  return <>{children}</>
}
