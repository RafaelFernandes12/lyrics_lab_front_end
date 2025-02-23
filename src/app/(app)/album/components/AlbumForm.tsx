'use client'

import { TAlbum, TUser } from '@/models'
import { get, put } from '@/services/axios'
import { storage } from '@/services/firebase'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useEffect, useState } from 'react'

interface Props {
  album: TAlbum
  children: React.ReactNode
  onSuccess: () => void
}

interface Data {
  name: string
  description: string
}

type Payload = {
  songIds?: number[]
  image?: string
} & Data

export function AlbumForm({ children, album, onSuccess }: Props) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const rules = [{ required: true, message: 'Preencha este campo!' }]

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await get<{ user: TUser }>('/auth/user')
      return response.user
    },
  })

  useEffect(() => {
    if (open && album) {
      form.setFieldsValue({
        name: album.name,
        description: album.description,
      })
    }
  }, [open, album, form])

  const resetData = () => {
    setOpen(false)
    setFile(null)
    form.resetFields()
  }

  const handleUploadImage = async (): Promise<string> => {
    if (!file || !user) throw new Error('Arquivo ou usuário não encontrado')

    const storageRef = ref(storage, `users/${user.id}/${album.id}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => resolve(await getDownloadURL(uploadTask.snapshot.ref)),
      )
    })
  }

  const handleDeleteImage = async () => {
    try {
      if (!album.image) return

      const decodedPath = decodeURIComponent(
        album.image.split('/o/')[1].split('?')[0],
      )

      await deleteObject(ref(storage, decodedPath))

      const payload: Payload = {
        name: album.name,
        description: album.description,
        songIds: album.songs.map((song) => song.id),
        image: '',
      }

      await put(`/album/${album.id}`, payload)

      message.success('Imagem removida com sucesso!')
      onSuccess()
      resetData()
    } catch (error) {
      resetData()
      message.error('Erro ao remover imagem!')
    }
  }

  const handleUpdateAlbum = async (data: Data) => {
    try {
      setLoading(true)
      const payload: Payload = {
        name: data.name,
        description: data.description,
        songIds: album.songs.map((song) => song.id),
        image: file ? await handleUploadImage() : album.image,
      }

      await put(`/album/${album.id}`, payload)

      message.success('Álbum atualizado com sucesso!')
      onSuccess()
      resetData()
    } catch (error) {
      resetData()
      message.error('Erro ao atualizar álbum!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>{children}</button>

      <Modal
        open={open}
        title="Editar Álbum"
        okText="Salvar"
        cancelText="Cancelar"
        confirmLoading={loading}
        onCancel={() => {
          resetData()
        }}
        onOk={form.submit}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateAlbum}>
          <Form.Item name="name" label="Nome" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Descrição" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Imagem do álbum">
            <Upload
              accept="image/*"
              beforeUpload={(file) => {
                setFile(file)
                return false
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
            </Upload>

            {file && (
              <div style={{ marginTop: 8, color: '#1890ff' }}>
                Arquivo selecionado: {file.name}
              </div>
            )}

            {album.image && (
              <div className="mt-4">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteImage}
                >
                  Remover imagem
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
