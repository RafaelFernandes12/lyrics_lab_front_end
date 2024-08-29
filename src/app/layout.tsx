import { AuthProvider } from '@/contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="pt-br" className="dark">
        {children}
      </html>
    </AuthProvider>
  )
}
