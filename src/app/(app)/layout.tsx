import { Header } from '@/components/Header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-white dark:bg-black">
      <Header />
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
  )
}
