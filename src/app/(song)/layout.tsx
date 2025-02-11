import { Header } from '@/components/header/Header'

export default function SongLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body
      className="bg-slate-100 dark:bg-gray-950"
      style={{ overflow: 'auto', paddingRight: '0px', margin: '0px' }}
    >
      <Header />
      <main className="m-10 my-10 h-fit rounded-md p-8 max-lg:m-1 max-lg:p-1">
        {children}
      </main>
    </body>
  )
}
