'use client'

import { register } from '@/services/axios'
import { Button, message, Steps, theme } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegisterForm } from './components/RegisterForm'
import { VerifyForm } from './components/VerifyForm'

export interface Data {
  name: string
  email: string
  password: string
  verificationCode: number
}

const steps = [{ title: 'Dados gerais' }, { title: 'Verificação' }]

export default function Register() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Data>({} as Data)
  const router = useRouter()

  const next = () => setCurrent(current + 1)
  const prev = () => setCurrent(current - 1)

  const handleRegister = async (values: Data) => {
    setLoading(true)
    try {
      const code = Math.floor(100000 + Math.random() * 900000)

      await fetch('/api/sendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, code }),
      })

      setFormData({ ...values, verificationCode: code })
      message.success('Email de verificação enviado!')
      next()
    } catch (error) {
      message.error('Erro ao enviar email de verificação')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (code: number) => {
    setLoading(true)
    try {
      if (code !== formData.verificationCode) {
        message.error('Código de verificação incorreto')
        return
      }
      await register(formData.name, formData.email, formData.password)
      message.success('Registro realizado com sucesso!')
      router.push('/login')
    } catch (error) {
      message.error('Erro ao finalizar registro! Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const contentStyle: React.CSSProperties = {
    padding: 24,
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px ${token.colorBorder}`,
    marginTop: 16,
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-16 w-full text-center text-2xl">Registrar</h1>
      <div className="w-[400px]">
        <Steps
          current={current}
          items={steps.map((s) => ({ title: s.title }))}
        />

        <div style={contentStyle}>
          {current === 0 ? (
            <RegisterForm onFinish={handleRegister} />
          ) : (
            <VerifyForm
              verificationCode={formData.verificationCode}
              onFinish={handleVerify}
            />
          )}
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
          {current > 0 && <Button onClick={prev}>Voltar</Button>}

          {current < steps.length - 1 ? (
            <Button
              type="primary"
              loading={loading}
              onClick={() =>
                (
                  document.getElementById('registerForm') as HTMLFormElement
                )?.requestSubmit()
              }
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="primary"
              loading={loading}
              onClick={() =>
                (
                  document.getElementById('verifyForm') as HTMLFormElement
                )?.requestSubmit()
              }
            >
              Verificar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
