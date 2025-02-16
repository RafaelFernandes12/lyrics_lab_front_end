<<<<<<< HEAD
import { QueryProvider } from '@/providers/QueryClientProvider'
=======
import { AuthProvider } from '@/contexts/AuthContext'
>>>>>>> main
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<<<<<<< HEAD
    <QueryProvider>
=======
    <AuthProvider>
>>>>>>> main
      <html
        lang="pt-br"
        className={poppins.variable}
        style={{ overflow: 'auto' }}
      >
        {children}
      </html>
<<<<<<< HEAD
    </QueryProvider>
=======
    </AuthProvider>
>>>>>>> main
  )
}
