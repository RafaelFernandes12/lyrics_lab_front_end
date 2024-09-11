'use client'
import { ButtonDialog } from '@/components/buttonDialog/index'
import { clientCreateAlbum } from '@/operations/albums/client-side/post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const {handleClick, open} = ButtonDialog.useOpen()
  const router = useRouter()
  function handleCreateAlbum() {
    clientCreateAlbum({ name, description }).then((r) => {
      console.log(r)
      router.refresh()
    })
  }

  return (
    <div>
      <ButtonDialog.Button handleClick={handleClick} text='Criar Música' />
      <ButtonDialog.Root text="Adicionar Álbum" action={handleCreateAlbum} handleClick={handleClick} open={open}>
        <ButtonDialog.Input
          value={name}
          placeholder="Nome"
          state={(e) => setName(e.target.value)}
        />
        <ButtonDialog.Input
          value={description}
          placeholder="Descrição"
          state={(e) => setDescription(e.target.value)}
        />
      </ButtonDialog.Root>
    </div>
  )
}
