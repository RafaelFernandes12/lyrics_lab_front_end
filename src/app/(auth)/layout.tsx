import { AuthHeader } from '@/components/header/AuthHeader'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="m-0 h-full bg-slate-100">
      <AuthHeader />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
    </div>
  )
}
