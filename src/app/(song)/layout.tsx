import { Header } from '@/components/header/Header'
import RouteGuard from '@/components/routeGuard'

export default function SongLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <RouteGuard>
        <Header />
        <main className="m-10 my-10 h-fit rounded-md p-8 max-lg:m-1 max-lg:p-1">
          {children}
        </main>
      </RouteGuard>
    </div>
  )
}
