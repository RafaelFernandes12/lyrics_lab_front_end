'use client'
import { AuthHeader } from '@/components/Header/AuthHeader'
import { login } from '@/operations/auth/login'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login(email, password)
  }
  return (
    <>
      <AuthHeader />
      <h1 className="my-20 w-full text-center">Acesse sua conta</h1>
      <section className="m-auto w-[600px] rounded-2xl border-2 border-black p-6 dark:border-white max-sm:w-full">
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          <p className="text-darkBlue">Esqueci minha senha</p>
          <button className="w-full bg-darkBlue" type="submit">
            <span className="text-white">Entrar</span>
          </button>
        </form>
        <p className="mt-4 text-center">
          Não tem uma conta{' '}
          <Link className="text-darkBlue" href="/register">
            Cadastre-se
          </Link>
        </p>
      </section>
    </>
  )
}
