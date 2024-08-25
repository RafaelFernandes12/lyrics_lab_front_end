'use client'
import { postAlbum } from '@/operations/albumRoutes/postAlbum'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  function handleCreateAlbum() {
    postAlbum(name, description)
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
