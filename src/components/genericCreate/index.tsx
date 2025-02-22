'use client'

import { TAlbum, TSong } from '@/models'
import { post } from '@/services/axios'
import { PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  type: 'song' | 'album'
}

export default function GenericCreate({ title, type }: Props) {
  const router = useRouter()

  async function handleCreate() {
    try {
      const response = await post<TAlbum | TSong>(`/${type}`, {
        name: 'Sem título',
      })
      router.push(`/${type}/${response.id.toString()}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        className="flex gap-2 rounded-md !bg-primaria p-3 hover:!bg-primariaHover"
        onClick={handleCreate}
      >
        <PlusOutlined style={{ color: 'white' }} />
        <p className="!font-semibold !text-white ">{`Criar ${title}`}</p>
      </button>
    </div>
  )
}
