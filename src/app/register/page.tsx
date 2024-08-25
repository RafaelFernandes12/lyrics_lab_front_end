'use client'

import { AuthHeader } from '@/components/Header/AuthHeader'
import { register } from '@/operations/auth/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    register(name, email, password)
      .then((res) => {
        console.log(res)
        router.push('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <AuthHeader />
      <h1 className="my-20 w-full text-center">Cadastrar</h1>
      <section className="m-auto w-[600px] rounded-2xl border-2 border-black p-6 dark:border-white max-sm:w-full">
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex w-full flex-col gap-2">
            <label>
              <p>Nome Completo</p>
            </label>
            <input
              className="rounded-lg border-2 border-black p-3"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label>
              <p>E-mail</p>
            </label>
            <input
              className="rounded-lg border-2 border-black p-3"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label>
              <p>Senha</p>
            </label>
            <input
              className="rounded-lg border-2 border-black p-3"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-darkBlue" type="submit">
            <span className="text-white">Cadastrar</span>
          </button>
        </form>
        <p className="mt-4 text-center">
          Já tem uma conta?{'         '}
          <Link className="text-darkBlue" href="/login">
            Acesse sua conta
          </Link>
        </p>
      </section>
    </>
  )
}
