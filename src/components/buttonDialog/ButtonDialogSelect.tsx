'use client'

import { playlistProps } from '@/models/playlistProps'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface buttonDialogProps {
  playlistId: number
  setPlaylistId: (e: SelectChangeEvent<number>) => void
  playlists: playlistProps[]
}

export function ButtonDialogSelect({
  playlistId,
  setPlaylistId,
  playlists,
}: buttonDialogProps) {
  return (
    <FormControl sx={{ minWidth: 120 }} className="w-full">
      <InputLabel>Curso</InputLabel>
      <Select value={playlistId} label="Playlist" onChange={setPlaylistId}>
        {playlists.map((playlist: playlistProps) => {
          return (
            <MenuItem key={playlist.id} value={playlist.id}>
              {playlist.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
