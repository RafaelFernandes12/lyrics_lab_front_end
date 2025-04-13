'use client'

import { TSong } from '@/models'
import { get, put } from '@/services/axios'
import { SaveFilled } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input, InputNumber, message } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

export default function EditSong() {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()
  const [text, setText] = useState<Omit<TSong, 'id' | 'createdAt' | 'albums'>>({
    name: '',
    tone: '',
    lyric: '',
    bpm: 0,
    compass: '',
  })

  const { data, isLoading } = useQuery({
    queryKey: ['song', id],
    queryFn: async () => {
      return await get<TSong>(`/song/${id}`)
    },
  })

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await put(`/song/${id}`, { ...text })
    },
    onSuccess: () => {
      push(`/song/${id}`)
    },
    onError: () => {
      message.error('Um erro ocorreu, tente novamente mais tarde!')
    },
  })

  useEffect(() => {
    if (data) {
      setText({ ...data })
    }
  }, [data])

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="flex justify-between max-lg:flex-col">
      <div className="m-auto bg-white p-6 max-lg:w-full md:min-w-[800px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              value={text.name}
              onChange={(e) =>
                setText((prev) => ({ ...prev, name: e.target.value }))
              }
              size="large"
              className="text-3xl"
            />
            <button onClick={() => mutate()} className="flex items-center">
              <SaveFilled />
            </button>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="text-sm text-gray-500">Tom: </span>
              <Input
                value={text.tone}
                onChange={(e) =>
                  setText((prev) => ({ ...prev, tone: e.target.value }))
                }
                className="w-20 text-xl"
              />
            </div>

            <div>
              <span className="text-sm text-gray-500">Bpm: </span>
              <InputNumber
                value={text.bpm}
                onChange={(value) =>
                  setText((prev) => ({ ...prev, bpm: value || 0 }))
                }
                min={0}
                className="w-20"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">Compasso: </span>
              <Input
                value={text.compass}
                onChange={(e) =>
                  setText((prev) => ({ ...prev, compass: e.target.value }))
                }
                className="w-20"
              />
            </div>
          </div>
        </div>

        <Input.TextArea
          value={text.lyric}
          onChange={(e) =>
            setText((prev) => ({ ...prev, lyric: e.target.value }))
          }
          style={{ height: '1200px', marginTop: '40px' }}
          // className="mt-10 h-[1200px] w-full resize-none font-mono text-sm"
          placeholder="Comece aqui"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
