import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className='dark'>
      <body className='dark:bg-black'>
        {/* <Header /> */}
        <main className='bg-slate-50 max-sm:bg-transparent p-8 max-sm:p-0 w-full my-10 rounded-md dark:bg-[#141414]'>{children}</main>
      </body>
    </html>
  );
}
