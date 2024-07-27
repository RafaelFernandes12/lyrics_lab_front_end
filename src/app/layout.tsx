import { Header } from '@/components/Header/Header'
import axios from '@/lib/reqInterceptor'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const fetcher = (url: string) => axios.get(url).then((r) => r.data)

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="dark">
      <body className="bg-white dark:bg-black">
        <Header />
        <main className="my-10 rounded-md bg-slate-50 p-8 dark:bg-[#141414]">
          {children}
        </main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ToastContainer />
      </body>
    </html>
  )
}
