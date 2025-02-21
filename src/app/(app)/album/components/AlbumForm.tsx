'use client'

import { TAlbum } from '@/models'
import { put } from '@/services/axios'
import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

interface Data {
  name: string
  description: string
}

interface Props {
  album: TAlbum
  children: React.ReactNode
  onSuccess: () => void
}

export function AlbumForm({ children, album, onSuccess }: Props) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const rules = [
    {
      required: true,
      message: 'Preencha este campo!',
    },
  ]

  useEffect(() => {
    if (open && album) {
      form.setFieldsValue({
        name: album.name,
        description: album.description,
      })
    }
  }, [open, album, form])

  async function onSubmit(data: Data) {
    const body = { name: data.name, description: data.description }

    await put<TAlbum>(`/album/${album.id}`, body).then(() => {
      onSuccess()
      setOpen(false)
    })
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>{children}</button>
      <Modal
        open={open}
        title="Editar Álbum"
        okText="Confirmar"
        cancelText="Cancelar"
        destroyOnClose
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={(values) => onSubmit(values)}
        >
          <Form.Item name="name" label="Nome" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Descrição" rules={rules}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
