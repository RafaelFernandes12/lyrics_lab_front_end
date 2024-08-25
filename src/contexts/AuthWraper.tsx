import { useRouter } from 'next/navigation'
import { ReactNode, useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'

interface AuthWrapperProps {
  children: ReactNode
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated } = useContext(AuthContext)
  console.log(isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default AuthWrapper
