import { Header } from '@/components/Header/Header'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="dark">
      <body className="dark:bg-black">
        <Header />
        <main className="my-10 rounded-md bg-slate-50 p-8 max-sm:p-2 dark:bg-[#141414]">
          {children}
        </main>
      </body>
    </html>
  )
}
