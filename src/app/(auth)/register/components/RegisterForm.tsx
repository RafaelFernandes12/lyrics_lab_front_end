'use client'

import { Form, Input } from 'antd'
import Link from 'next/link'
import { Data } from '../page'

interface Props {
  onFinish: (values: Data) => void
}

export const RegisterForm = ({ onFinish }: Props) => {
  return (
    <Form
      id="registerForm"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      className="max-sm:flex max-sm:flex-col max-sm:items-center"
    >
      <Form.Item
        name="name"
        label="Nome de usuário"
        rules={[{ required: true, message: 'Digite seu nome' }]}
        className="max-sm:w-full"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: 'Digite seu email' },
          { type: 'email', message: 'Email inválido' },
        ]}
        className="max-sm:w-full"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Senha"
        className="max-sm:w-full"
        rules={[
          { required: true, message: 'Digite sua senha' },
          {
            pattern: /^[\w!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]{8,}$/,
            message:
              'Deve conter no mínimo 8 caracteres entre letras, números e símbolos',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Senha"
        className="max-sm:w-full"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Confirme sua senha' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Senhas não coincidem'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className="mt-4">
        Já possui uma conta?{' '}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </div>
    </Form>
  )
}
