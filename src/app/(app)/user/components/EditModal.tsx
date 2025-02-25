'use client'

import { changeName, changePassword, logout } from '@/services/axios'
import { Card, Form, Input, message, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  id: number
  email: string
  children: React.ReactNode
  onSuccess: () => void
}

export const EditModal = ({ id, email, children, onSuccess }: Props) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState<string>('name')
  const rules = [{ required: true, message: 'Preencha este campo!' }]
  const router = useRouter()

  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const resetData = () => {
    setOpen(false)
    form.resetFields()
  }

  async function handleEditName(data: { name: string }) {
    try {
      setLoading(true)
      await changeName(id, data.name)
      message.success('Nome alterado com sucesso!')
      setLoading(false)
      resetData()
      onSuccess()
    } catch (error) {
      message.error('Erro ao alterar o nome.')
      setLoading(false)
      resetData()
    }
  }

  async function handleEditPass(data: { curentPass: string; newPass: string }) {
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/

    if (data.curentPass === data.newPass) {
      message.error('A nova senha não pode ser igual à atual')
      return
    }

    if (!passwordRegex.test(data.newPass)) {
      message.error(
        'A senha deve conter no mínimo 8 caracteres com apenas letras e números',
      )
      return
    }

    try {
      setLoading(true)
      await changePassword(email, data.curentPass, data.newPass)
      message.success('Senha alterada com sucesso!')
      setLoading(false)
      resetData()
      logout().then(() => router.push('/'))
    } catch (error) {
      message.error('Erro ao alterar senha.')
      setLoading(false)
      resetData()
    }
  }

  const tabList = [
    {
      key: 'name',
      label: 'Nome',
    },
    {
      key: 'pass',
      label: 'Senha',
    },
  ]

  const contentList: Record<string, React.ReactNode> = {
    name: (
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => handleEditName(value)}
      >
        <Form.Item name="name" label="Novo nome" rules={rules}>
          <Input />
        </Form.Item>
      </Form>
    ),
    pass: (
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleEditPass(values)}
      >
        <Form.Item
          name="curentPass"
          label="Senha atual"
          rules={rules}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="newPass" label="Nova senha" rules={rules} hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirme a nova senha"
          dependencies={['newPass']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor, confirme a nova senha!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPass') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('As senhas não coincidem!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    ),
  }

  return (
    <div>
      <button className="w-full" onClick={() => setOpen(true)}>
        {children}
      </button>

      <Modal
        open={open}
        title="Editar informações de usuário (uma por vez)"
        okText="Salvar"
        cancelText="Cancelar"
        confirmLoading={loading}
        onCancel={() => resetData()}
        onOk={form.submit}
      >
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: 'middle',
          }}
        >
          {contentList[activeTabKey]}
        </Card>
      </Modal>
    </div>
  )
}
