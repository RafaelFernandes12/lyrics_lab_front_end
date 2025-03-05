import { AuthHeader } from '@/components/header/AuthHeader'
import Link from 'next/link'

export default function Home() {
  return (
    <body className="m-0 bg-slate-100 dark:bg-black">
      <AuthHeader />
      <main className="m-[6%] my-10 mt-16 h-fit rounded-md text-left">
        <h1 className="text-4xl font-bold text-gray-900">
          Componha sem limites.
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Organize suas cifras, explore sua criatividade.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/login">
            <button className="bg-gray-200 text-black hover:bg-gray-300">
              Fazer login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-primaria text-white hover:bg-primariaHover">
              Cadastre-se
            </button>
          </Link>
        </div>
      </main>
    </body>
  )
}
