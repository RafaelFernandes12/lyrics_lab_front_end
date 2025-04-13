import { AuthHeader } from '@/components/header/AuthHeader'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <AuthHeader />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
    </div>
  )
}
