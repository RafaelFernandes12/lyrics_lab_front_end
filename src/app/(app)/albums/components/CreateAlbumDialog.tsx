'use client'
import { ButtonDialog } from '@/components/buttonDialog/index'
import { clientCreateAlbum } from '@/operations/albums/client-side/post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  function handleCreateAlbum() {
    clientCreateAlbum({ name, description }).then((r) => {
      console.log(r)
      router.refresh()
    })
  }

  return (
    <div>
      <ButtonDialog.Root
        text="Adicionar Álbum"
        action={handleCreateAlbum}
        header={
          <ButtonDialog.Button text="Criar Álbum" />
        }
        body={
          <>
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
          </>
        }
      />
    </div>
  )
}
