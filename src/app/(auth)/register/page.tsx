'use client'

import { register } from '@/operations/auth/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/
    if (!passwordRegex.test(password)) {
      alert(
        'Senha inválida. A senha deve ter no mínimo 8 caracteres e conter apenas letras e números.',
      )
      return
    }

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
      <h1 className="my-16 w-full text-center">Cadastre-se</h1>
      <section className="m-auto w-[400px] max-sm:w-full">
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <div className="flex w-full flex-col">
            <label>
              <p>Nome de usuário</p>
            </label>
            <input
              className="rounded-lg bg-gray-200 p-3"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button className="bg-blueButton mt-3 w-full" type="submit">
            <span className="text-white">Cadastrar</span>
          </button>
        </form>
        <p className="mt-3 text-center">
          Já tem uma conta?{'         '}
          <Link className="text-blueButton" href="/login">
            Acesse sua conta!
          </Link>
        </p>
      </section>
    </>
  )
}
