'use client'
<<<<<<< HEAD

import { ButtonDialog } from '@/components/buttonDialog'
import { TSong } from '@/models'
import { post } from '@/services/axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface createSongDialogProps {
  token: string
}

export function CreateSongDialog({ token }: createSongDialogProps) {
=======
import { ButtonDialog } from '@/components/buttonDialog'
import { clientCreateSong } from '@/operations/songs/client-side/post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateSongDialog() {
>>>>>>> main
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumIds, setAlbumIds] = useState<number[]>([])
  const router = useRouter()

<<<<<<< HEAD
  async function handleCreateSong() {
    await post<TSong>('/song', { name, tone, albumIds }, token).then(() => {
=======
  function handleCreateSong() {
    clientCreateSong({ name, tone, albumIds }).then(() => {
>>>>>>> main
      router.refresh()
    })
  }

  return (
    <ButtonDialog.Root
      text="Adicionar Música"
      action={handleCreateSong}
<<<<<<< HEAD
      header={<ButtonDialog.Button text="Criar Música" />}
      body={
        <>
=======
      header={

        <ButtonDialog.Button text="Criar Música" />
      }
      body={
        <>

>>>>>>> main
          <ButtonDialog.Input
            value={name}
            placeholder="Nome"
            state={(e) => setName(e.target.value)}
          />
          <ButtonDialog.Input
            value={tone}
            placeholder="Tom"
            state={(e) => setTone(e.target.value)}
          />
          {/* <ButtonDialog.SelectAlbums
          setAlbumsIds={setAlbumIds}
          albumsIds={albumIds}
        /> */}
        </>
      }
    />
  )
}
