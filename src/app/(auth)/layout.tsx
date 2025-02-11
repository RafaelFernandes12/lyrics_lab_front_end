import { AuthHeader } from '@/components/header/AuthHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-[#FAFAFA]">
      <AuthHeader />
      <main className="m-[6%] my-10 h-fit rounded-md">{children}</main>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        limit={1}
      />
    </body>
  )
}
