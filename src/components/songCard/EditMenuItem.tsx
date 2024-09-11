'use client'
import { SuccessHandler } from '@/helpers/SuccessHandler'
import { fetcher } from '@/lib/fetcher'
import { idProps } from '@/models/idProps'
import { clientEditSong } from '@/operations/songs/client-side/editSong'
import { Dialog, DialogContent, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid'
import { ButtonDialog } from '../buttonDialog/index'
import { songProps } from '@/models/songProps'
import { albumProps } from '@/models/albumProps'
export function EditMenuItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumIds, setAlbumIds] = useState<number[]>([])
  
  const {open, handleClick} = ButtonDialog.useOpen()
  
  const router = useRouter()
  
  
  const { data: song } = useSWR<songProps>(`/song/${id}`, fetcher)

  useEffect(() => {
    if (open && song) {
      setName(song.name)
      setTone(song.tone)
      setAlbumIds(song.albums.map((album) => album.id))
    }
  }, [open, song])
  console.log(song)
  function handleEditSong() {
    clientEditSong({ id, name, tone, albumIds })
      .then(() => router.refresh())
      .then(() =>
        SuccessHandler({ id: uuidv4(), message: 'Música editada com sucesso' }),
      )
  }

  return (
    <>
      <MenuItem onClick={handleClick}>Editar</MenuItem>
        <ButtonDialog.Root handleClick={handleClick} action={handleEditSong} open={open} text='Editar Música'>
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
          <ButtonDialog.SelectAlbums setAlbumsIds={setAlbumIds} albumsIds={albumIds}/>
      </ButtonDialog.Root>
    </>
  )
}
