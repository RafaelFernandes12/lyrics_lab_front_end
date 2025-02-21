import { Header } from '@/components/header/Header'

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="m-0 bg-slate-100 dark:bg-black">
      <Header />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
    </body>
  )
}
