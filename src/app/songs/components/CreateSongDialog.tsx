'use client'
import { clientCreateSong } from '@/operations/songs/client-side/post'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'

export function CreateSongDialog() {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumId, setAlbumId] = useState<number>(3)

  function handleCreateSong() {
    clientCreateSong({ name, tone, albumId })
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
      />
    </ButtonDialog.Root>
  )
}
