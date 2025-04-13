import sectionImage from '@/assets/section.svg'
import { AuthHeader } from '@/components/header/AuthHeader'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="m-0 bg-slate-100">
      <AuthHeader />
      <main className="m-[6%] my-10 mt-16 h-fit rounded-md text-left">
        <section className="relative">
          <Image
            src={sectionImage}
            alt="dash-section"
            className="w-full object-contain"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-[40px] left-[40px] px-4 py-2">
            <Link href="/login">
              <button className="mr-3 rounded-md bg-gray-200 p-3 text-black hover:bg-gray-300">
                Fazer login
              </button>
            </Link>
            <Link href="/register">
              <button className="rounded-md bg-primaria p-3 text-white hover:bg-primariaHover">
                Cadastre-se
              </button>
            </Link>
          </div>
        </section>
        <div className="mt-8 flex gap-4"></div>
      </main>
    </div>
  )
}
