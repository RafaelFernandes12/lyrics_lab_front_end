import { AuthHeader } from '@/components/Header/AuthHeader'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-[#FAFAFA]">
      <AuthHeader />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
    </body>
  )
}
