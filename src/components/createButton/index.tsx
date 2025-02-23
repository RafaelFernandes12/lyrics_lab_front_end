'use client'

import { TAlbum, TSong } from '@/models'
import { post } from '@/services/axios'
import { PlusOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  type: 'song' | 'album'
}

export default function CreateButton({ title, type }: Props) {
  const router = useRouter()

  async function handleCreate() {
    try {
      const response = await post<TAlbum | TSong>(`/${type}`, {
        name: 'Sem título',
      })
      message.success(
        `Criou ${type === 'album' ? 'álbum' : 'música'} com sucesso!`,
      )
      if (type === 'song') router.push(`/song/${response.id.toString()}/edit`)
      else router.push(`/album/${response.id.toString()}`)
    } catch (error) {
      message.error(`Erro ao criar ${type === 'album' ? 'álbum' : 'música'}.`)
    }
  }

  return (
    <div>
      <button
        className="flex gap-2 rounded-md !bg-primaria p-3 hover:!bg-primariaHover"
        onClick={handleCreate}
      >
        <PlusOutlined style={{ color: 'white' }} />
        <p className="font-semibold text-white ">{`Criar ${title}`}</p>
      </button>
    </div>
  )
}
