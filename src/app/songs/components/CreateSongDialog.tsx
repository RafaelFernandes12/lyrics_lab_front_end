'use client'
import { fetcher } from '@/lib/fetcher'
import { postSong } from '@/operations/songRoutes/postSong'
import { useState } from 'react'
import useSWR from 'swr'
import { ButtonDialog } from '../../../components/buttonDialog/index'
export function CreateSongDialog() {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumId, setAlbumId] = useState<number>(1)
  const { data: albums } = useSWR('/Album', fetcher)
  function handleCreateSong() {
    postSong(name, tone, albumId)
  }
  return (
    <ButtonDialog.Root text="Adicionar Música" action={handleCreateSong}>
      <ButtonDialog.Input
        placeholder="Nome"
        state={(e) => setName(e.target.value)}
      />
      <ButtonDialog.Input
        placeholder="Tom"
        state={(e) => setTone(e.target.value)}
      />
      <ButtonDialog.Select
        albumId={albumId}
        setAlbumId={(e) => setAlbumId(Number(e.target.value))}
        albums={albums}
      />
    </ButtonDialog.Root>
  )
}
