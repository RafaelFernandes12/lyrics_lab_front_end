import { Header } from '@/components/header/Header'
import RouteGuard from '@/components/routeGuard'

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="m-0 h-full bg-slate-100">
      <RouteGuard>
        <Header />
        <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
      </RouteGuard>
    </div>
  )
}
