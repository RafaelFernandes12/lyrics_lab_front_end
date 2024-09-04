import { AuthProvider } from '@/contexts/AuthContext'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="pt-br" className={poppins.variable}>
        {children}
      </html>
    </AuthProvider>
  )
}
