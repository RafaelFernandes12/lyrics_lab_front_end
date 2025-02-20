'use client'

import { SuccessHandler } from '@/helpers/SuccessHandler'
import { idProps, TAlbum, TSong } from '@/models'
import { get, put } from '@/services/axios'
import EditIcon from '@mui/icons-material/Edit'
import { MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ButtonDialog } from '../buttonDialog/index'

export function EditMenuItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albums, setAlbums] = useState<TAlbum[]>([])
  const [error, setError] = useState(false)

  const router = useRouter()

  const { data: song } = useQuery({
    queryKey: ['song', id],
    queryFn: async () => {
      return await get<TSong>(`song/${id}`)
    },
  })

  useEffect(() => {
    if (song) {
      setName(song.name)
      setTone(song.tone)
      setAlbums(song?.albums || [])
    }
  }, [song])

  async function handleEditSong() {
    if (!name.trim()) {
      setError(true)
      return
    }
    await put<TSong>(`/song/${id}`, { name, tone, albums }).then(() => {
      SuccessHandler({ id: uuidv4(), message: 'Música editada com sucesso' })
      setError(false)
      router.refresh()
    })
  }

  return (
    <ButtonDialog.Root
      action={handleEditSong}
      text="Editar Música"
      header={
        <MenuItem className="flex items-center gap-3" data-testid="menuItem">
          <EditIcon
            sx={{
              height: '18px',
              width: '18px',
            }}
          />
          Editar
        </MenuItem>
      }
      body={
        <>
          <ButtonDialog.Input
            value={name}
            placeholder="Nome"
            state={(e) => setName(e.target.value)}
          />
          <ButtonDialog.Input
            value={tone}
            placeholder="Tom"
            state={(e) => setTone(e.target.value)}
          />
          <ButtonDialog.SelectAlbums albums={song?.albums || []} />
          {error && (
            <p className="text-red-500 dark:text-red-500">
              O nome não pode estar vazio!
            </p>
          )}
        </>
      }
    />
  )
}
