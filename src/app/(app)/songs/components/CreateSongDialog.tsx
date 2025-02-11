'use client'
import { ButtonDialog } from '@/components/buttonDialog'
import { clientCreateSong } from '@/operations/songs/client-side/post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateSongDialog() {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumIds, setAlbumIds] = useState<number[]>([])
  const router = useRouter()

  function handleCreateSong() {
    clientCreateSong({ name, tone, albumIds }).then(() => {
      router.refresh()
    })
  }

  return (
    <ButtonDialog.Root
      text="Adicionar Música"
      action={handleCreateSong}
      header={

        <ButtonDialog.Button text="Criar Música" />
      }
      body={
        <>

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
