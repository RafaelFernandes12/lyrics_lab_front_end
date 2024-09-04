'use client'
import { ButtonDialog } from '@/components/buttonDialog/index'
import { clientCreateAlbum } from '@/operations/albums/client-side/post'
import { useState } from 'react'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleCreateAlbum() {
    clientCreateAlbum({ name, description })
  }

  return (
    <ButtonDialog.Root text="Adicionar Álbum" action={handleCreateAlbum}>
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
