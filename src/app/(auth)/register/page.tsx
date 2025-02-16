'use client'

import { ErrorHandler } from '@/helpers/ErrorHandler'
<<<<<<< HEAD
import { register } from '@/services/axios'
=======
import { register } from '@/operations/auth/register'
>>>>>>> main
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import CircularIndeterminate from './components/CircularIndeterminate'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState<number>(0)
  const [enteredCode, setEnteredCode] = useState('')
  const [step, setStep] = useState('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/
    if (!passwordRegex.test(password)) {
      setError(
        'Senha inválida: a senha deve conter no mínimo 8 caracteres com apenas letras e números',
      )
      return
    }

    setError('')
    setLoading(true)

    const code = Math.floor(100000 + Math.random() * 900000)
    setVerificationCode(code)

    try {
      await fetch('/api/sendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      setStep('verify')
    } catch (error) {
      console.error('Erro ao enviar email de verificação:', error)
      alert('Erro ao enviar o email de verificação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyCode() {
    if (parseInt(enteredCode) !== verificationCode) {
      ErrorHandler(error, 'Código de verificação inválido!')
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
    setError('')
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
                  disabled={loading}
                  required
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
                  disabled={loading}
                  required
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
                  disabled={loading}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="mt-3 w-full bg-blueButton"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularIndeterminate />
                ) : (
                  <span className="text-white">Cadastrar</span>
                )}
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
        <>
          <h1 className="my-16 text-center">Verifique seu email</h1>
          <div className="m-auto flex w-[400px] flex-col items-center max-sm:w-full">
            <input
              type="text"
              className="w-52 rounded-lg bg-gray-200 p-3"
              placeholder="Código de verificação"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              disabled={loading}
              required
            />
            <button
              className="mt-3 w-52 bg-blueButton"
              onClick={handleVerifyCode}
              disabled={loading}
            >
              <span className="text-white">Verificar código</span>
            </button>
            <button
              className="mt-3 text-blueButton"
              onClick={handleBackToForm}
              disabled={loading}
            >
              Voltar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
