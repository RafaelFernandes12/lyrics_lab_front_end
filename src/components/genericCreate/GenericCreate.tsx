'use client'

import { TAlbum, TSong } from '@/models'
import { post } from '@/services/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  title: string
  type: 'song' | 'album'
}

export default function GenericCreate({ title, type }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCreate() {
    setLoading(true)

    try {
      const response = await post<TAlbum | TSong>(`/${type}`, {
        name: 'Sem título',
      })
      router.push(`/${type}/${response.id.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        type="primary"
        className="!bg-primaria hover:!bg-primariaHover"
        icon={<PlusOutlined style={{ color: 'white' }} />}
        loading={loading}
        onClick={handleCreate}
        size="large"
      >
        <p className="!font-semibold !text-white ">{`Criar ${title}`}</p>
      </Button>
    </div>
  )
}
