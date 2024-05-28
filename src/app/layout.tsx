import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="dark">
      <body className="bg-white dark:bg-black">{children}</body>
    </html>
  )
}
