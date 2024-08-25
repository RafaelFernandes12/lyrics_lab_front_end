'use client'
import { postAlbum } from '@/operations/albumRoutes/postAlbum'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const cookies = parseCookies()
  const token = cookies.lltoken

  function handleCreateAlbum() {
    postAlbum(name, description, token)
  }

  return (
    <ButtonDialog.Root text="Adicionar Album" action={handleCreateAlbum}>
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
