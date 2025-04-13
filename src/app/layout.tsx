import { QueryProvider } from '@/providers/QueryClientProvider'
import '@ant-design/v5-patch-for-react-19'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <html
        lang="pt-br"
        className={poppins.variable}
        style={{
          height: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <body
          style={{
            height: '100%',
            minHeight: '100%',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </body>
      </html>
    </QueryProvider>
  )
}
