'use client'

import { login } from '@/services/axios'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const rules = [{ required: true, message: 'Preencha este campo!' }]
  const router = useRouter()

  async function handleLogin(values: { email: string; password: string }) {
    setLoading(true)

    try {
      await login(values.email, values.password)
      router.push('/dashboard')
    } catch (error) {
      message.error('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ width: '100%' }}
      onFinish={handleLogin}
    >
      <Form.Item name="email" rules={rules}>
        <Input
          prefix={<MailOutlined style={{ marginRight: '6px' }} />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item name="password" rules={rules}>
        <Input.Password
          prefix={<LockOutlined style={{ marginRight: '6px' }} />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="mb-3"
          loading={loading}
          block
          type="primary"
          htmlType="submit"
        >
          Log in
        </Button>
        Não tem uma conta?{' '}
        <Link className="text-primaria hover:underline" href="/register">
          Cadastre-se!
        </Link>
      </Form.Item>
    </Form>
  )
}
