'use client'
<<<<<<< HEAD

import { ButtonDialog } from '@/components/buttonDialog/index'
import { TAlbum } from '@/models'
import { post } from '@/services/axios'
import { getCookie } from 'cookies-next'
=======
import { ButtonDialog } from '@/components/buttonDialog/index'
import { clientCreateAlbum } from '@/operations/albums/client-side/post'
>>>>>>> main
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

<<<<<<< HEAD
  async function handleCreateAlbum() {
    const token = (await getCookie('jwt')) || ''
    await post<TAlbum>(`album`, { name, description }, token).then((r) => {
=======
  function handleCreateAlbum() {
    clientCreateAlbum({ name, description }).then((r) => {
>>>>>>> main
      console.log(r)
      router.refresh()
    })
  }

  return (
    <div>
      <ButtonDialog.Root
        text="Adicionar Álbum"
        action={handleCreateAlbum}
<<<<<<< HEAD
        header={<ButtonDialog.Button text="Criar Álbum" />}
=======
        header={
          <ButtonDialog.Button text="Criar Álbum" />
        }
>>>>>>> main
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
