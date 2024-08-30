'use client'

import { albumProps } from '@/models/albumProps'
import { clientGetAlbums } from '@/operations/albums/client-side/getAll'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'

interface buttonDialogProps {
  albumId: number
  setAlbumId: (e: SelectChangeEvent<number>) => void
}

export function ButtonDialogSelect({ albumId, setAlbumId }: buttonDialogProps) {
  const [albums, setAlbums] = useState<albumProps[]>([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await clientGetAlbums()
        if (Array.isArray(data)) {
          setAlbums(data)
        } else {
          console.error('Fetched albums is not an array')
          setAlbums([])
        }
      } catch (error) {
        console.error('Failed to fetch albums:', error)
        setAlbums([])
      }
    }

    fetchAlbums()
  }, [])

  return (
    <FormControl sx={{ minWidth: 120 }} className="w-full">
      <InputLabel>Álbum</InputLabel>
      <Select value={albumId} label="Álbum" onChange={setAlbumId}>
        {albums.map((album: albumProps) => (
          <MenuItem key={album.id} value={album.id}>
            {album.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
