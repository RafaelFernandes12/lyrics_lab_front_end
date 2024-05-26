import { Header } from '@/components/Header/Header';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main className='bg-slate-50 p-8 my-10 rounded-md'>{children}</main>
      </body>
    </html>
  );
}
