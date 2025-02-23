import { AuthHeader } from '@/components/header/AuthHeader'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="m-0 bg-slate-100 dark:bg-black">
      <AuthHeader />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
    </body>
  )
}
