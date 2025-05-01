'use client'

import { login } from '@/services/axios'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const rules = [{ required: true, message: 'Preencha este campo!' }]
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      setLoading(true)
      return await login(data.email, data.password)
    },
    onSuccess: () => router.push('/dashboard'),
    onError: () => message.error('Email ou Senha incorretos'),
    onSettled: () => setLoading(false),
  })

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ width: '100%' }}
      onFinish={mutate}
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
