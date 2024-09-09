'use client'

import { fetcher } from '@/lib/fetcher'
import { albumProps } from '@/models/albumProps'
import { clientGetAlbums } from '@/operations/albums/client-side/getAll'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

interface buttonDialogProps {
  title: string
  url: string
  dataIds: number[]
  setDataIds: (e: number[]) => void
}

interface dataProps {
  id: number
  name: string
}

export function ButtonDialogSelect({
  url,
  title,
  dataIds,
  setDataIds,
}: buttonDialogProps) {

  let { data } = useSWR<dataProps[]>(url, fetcher)

  if(!data) data = []

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedNames = event.target.value as string[]
    const selectedIds = selectedNames.map(
      (name) => data?.find((album) => album.name === name)?.id as number,
    )
    setDataIds(selectedIds)
  }

  const selectedNames = dataIds
    .map((id) => data?.find((album) => album.id === id)?.name)
    .filter((name) => name !== undefined) as string[]

  return (
    <FormControl sx={{ minWidth: 120 }} className="w-full">
      <InputLabel>Álbuns</InputLabel>
      <Select
        multiple
        value={selectedNames}
        label={title}
        onChange={handleSelectChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {data?.map((album) => (
          <MenuItem key={album.id} value={album.name}>
            {album.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
