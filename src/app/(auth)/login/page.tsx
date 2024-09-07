'use client'

import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useContext, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <>
      <h1 className="my-16 w-full text-center">Acesse sua conta</h1>
      <section className="m-auto w-[400px] max-sm:w-full">
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <div className="flex w-full flex-col">
            <label>
              <p>E-mail</p>
            </label>
            <input
              className="rounded-lg bg-gray-200 p-3"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>
              <p>Senha</p>
            </label>
            <input
              className="rounded-lg bg-gray-200 p-3"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-3 w-full bg-blueButton" type="submit">
            <span className="text-white">Entrar</span>
          </button>
        </form>
        <p className="mt-3 text-center text-blueButton">Esqueci minha senha</p>
        <p className="mt-3 text-center">
          Não tem uma conta?{' '}
          <Link className="text-blueButton" href="/register">
            Cadastre-se!
          </Link>
        </p>
      </section>
    </>
  )
}
