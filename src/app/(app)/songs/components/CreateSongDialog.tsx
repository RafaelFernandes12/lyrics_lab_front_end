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
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }
  function handleCreateSong() {
    clientCreateSong({ name, tone, albumIds }).then(() => {
      router.refresh()
    })
  }

  return (
    <div>
      <ButtonDialog.Button handleClick={handleClick} text="Criar Música" />
      <ButtonDialog.Root
        text="Adicionar Música"
        action={handleCreateSong}
        open={open}
        handleClick={handleClick}
      >
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
        <ButtonDialog.SelectAlbums
          setAlbumsIds={setAlbumIds}
          albumsIds={albumIds}
        />
      </ButtonDialog.Root>
    </div>
  )
}
