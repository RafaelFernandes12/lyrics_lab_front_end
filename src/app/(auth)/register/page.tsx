'use client'

import { register } from '@/operations/auth/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState<number>(0)
  const [enteredCode, setEnteredCode] = useState('')
  const [step, setStep] = useState('form')
  const router = useRouter()

  function handleCodeChange(e: ChangeEvent<HTMLInputElement>) {
    setEnteredCode(e.target.value)
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/
    if (!passwordRegex.test(password)) {
      alert(
        'Senha inválida: a senha deve conter no mínimo 8 caracteres com apenas letras e números',
      )
      return
    }

    const code = Math.floor(100000 + Math.random() * 900000)
    setVerificationCode(code)

    await fetch('/api/sendVerificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })

    setStep('verify')
  }

  async function handleVerifyCode() {
    if (parseInt(enteredCode) !== verificationCode) {
      alert('Código de verificação inválido.')
      return
    }

    await register(name, email, password)
    router.push('/login')
  }

  function handleBackToForm() {
    setStep('form')
    setEmail('')
    setName('')
    setPassword('')
  }

  return (
    <div>
      {step === 'form' ? (
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
              <button className="mt-3 w-full bg-blueButton" type="submit">
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
      ) : (
        <div>
          <input
            type="text"
            placeholder="Código de verificação"
            value={enteredCode}
            onChange={handleCodeChange}
          />
          <button onClick={handleVerifyCode}>Verificar Código</button>
          <button onClick={handleBackToForm}>Voltar</button>
        </div>
      )}
    </div>
  )
}
