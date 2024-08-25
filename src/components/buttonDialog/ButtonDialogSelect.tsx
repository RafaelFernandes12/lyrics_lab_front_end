'use client'

import { albumProps } from '@/models/albumProps'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface buttonDialogProps {
  albumId: number
  setAlbumId: (e: SelectChangeEvent<number>) => void
  albums: albumProps[]
}

export function ButtonDialogSelect({
  albumId,
  setAlbumId,
  albums,
}: buttonDialogProps) {
  return (
    <FormControl sx={{ minWidth: 120 }} className="w-full">
      <InputLabel>Curso</InputLabel>
      <Select value={albumId} label="Playlist" onChange={setAlbumId}>
        {albums.map((playlist: albumProps) => {
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
