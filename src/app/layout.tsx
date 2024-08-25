import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="pt-br" className="dark">
        <body className="bg-white dark:bg-black">
          <main className="my-10 h-fit rounded-md bg-slate-50 p-8 dark:bg-[#141414] max-sm:p-4">
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
    </AuthProvider>
  )
}
