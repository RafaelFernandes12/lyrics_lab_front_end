import { Header } from '@/components/Header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body
      className="bg-slate-100 dark:bg-gray-950"
      style={{ overflow: 'auto', paddingRight: '0px', margin: '0px' }}
    >
      <Header />
      <main className="m-10 my-10 h-fit rounded-md p-8 max-sm:p-4">
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
