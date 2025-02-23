'use client'

import { TAlbum, TSong } from '@/models'
import { get, put } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import type { SelectProps } from 'antd'
import { Form, message, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

interface Values {
  songIds: number[]
}

interface Props {
  album: TAlbum
  onSuccess: () => void
}

export const SongsSelect = ({ album, onSuccess }: Props) => {
  const [form] = Form.useForm()
  const [, setFormValues] = useState<Values>()
  const [defaultValues, setDefaultValues] = useState<number[]>([])
  const [open, setOpen] = useState(false)

  const { data: songs = [] } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      return await get<TSong[]>('song')
    },
  })

  useEffect(() => {
    setDefaultValues(album.songs.map((song) => song.id))
  }, [album.songs])

  const options: SelectProps['options'] = songs.map((song) => ({
    label: song.name,
    value: song.id,
  }))

  const handleUpdadeSongs = async (data: Values) => {
    try {
      await put<TAlbum>(`/album/${album.id}`, {
        name: album.name,
        description: album.description,
        image: album.image,
        songIds: data.songIds,
      })
      message.success('Músicas atualizadas com sucesso!')
      onSuccess()
      setFormValues(data)
      setOpen(false)
    } catch (error) {
      message.error('Erro ao atualizar músicas!')
      setOpen(false)
    }
  }

  return (
    <div className="flex w-full justify-end">
      <button
        className="rounded-md bg-primaria p-3 font-semibold text-white hover:bg-primariaHover"
        onClick={() => setOpen(true)}
      >
        Adicionar músicas
      </button>

      <Modal
        open={open}
        title="Adicionar músicas"
        okText="Salvar"
        cancelText="Cancelar"
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdadeSongs}
          initialValues={{ songIds: defaultValues }}
        >
          <Form.Item
            name="songIds"
            label="Músicas"
            rules={[
              { required: true, message: 'Selecione pelo menos uma música!' },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Selecione as músicas"
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
