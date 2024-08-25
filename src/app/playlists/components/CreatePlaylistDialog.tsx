'use client'
import { postPlaylist } from '@/operations/playlistRoutes/postPlaylist'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'

export function CreatePlaylistDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const cookies = parseCookies()
  const token = cookies.lltoken

  function handleCreatePlaylist() {
    window.alert(`token: ${token}`)
    postPlaylist(name, description, token)
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
