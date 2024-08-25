'use client'
import { fetcher } from '@/lib/fetcher'
import { postSong } from '@/operations/songRoutes/postSong'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import useSWR from 'swr'
import { ButtonDialog } from '../../../components/buttonDialog/index'

export function CreateSongDialog() {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [playlistId, setPlaylistId] = useState<number>(3)

  const cookies = parseCookies()
  const token = cookies.lltoken

  const { data: playlists } = useSWR(['/album', token], ([url, token]) =>
    fetcher(url, token),
  )

  function handleCreateSong() {
    postSong(name, tone, playlistId, token)
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
