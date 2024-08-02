'use client'
import { postPlaylist } from '@/operations/playlistRoutes/postPlaylist'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'
export function CreatePlaylistDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  function handleCreatePlaylist() {
    postPlaylist(name, description)
  }
  return (
    <ButtonDialog.Root text="Adicionar playlist" action={handleCreatePlaylist}>
      <ButtonDialog.Input
        placeholder="Nome"
        state={(e) => setName(e.target.value)}
      />
      <ButtonDialog.Input
        placeholder="Descrição"
        state={(e) => setDescription(e.target.value)}
      />
    </ButtonDialog.Root>
  )
}
