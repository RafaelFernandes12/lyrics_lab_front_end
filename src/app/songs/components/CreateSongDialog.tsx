'use client'
import { postSong } from '@/operations/songRoutes/postSong'
import { useState } from 'react'
import { ButtonDialog } from '../../../components/buttonDialog/index'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
export function CreateSongDialog() {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [playlistId, setPlaylistId] = useState<number>(3)
  const { data: playlists } = useSWR('/Playlist', fetcher)
  function handleCreateSong() {
    postSong(name, tone, playlistId)
  }
  return (
    <ButtonDialog.Root text="Adicionar Música" action={handleCreateSong}>
      <ButtonDialog.Input
        placeholder="Nome"
        state={(e) => setName(e.target.value)}
      />
      <ButtonDialog.Input
        placeholder="Tom"
        state={(e) => setTone(e.target.value)}
      />
      <ButtonDialog.Select
        playlistId={playlistId}
        setPlaylistId={(e) => setPlaylistId(Number(e.target.value))}
        playlists={playlists}
      />
    </ButtonDialog.Root>
  )
}
