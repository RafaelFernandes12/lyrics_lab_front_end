'use client'

import { idProps } from '@/models/idProps'
import { clientDeleteSong } from '@/operations/songs/client-side/delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  function handleClick() {
    setOpen(!open)
  }
  function handleDeleteSong() {
    clientDeleteSong(id).then(() => router.refresh())
  }
  return (
    <>
      <MenuItem className="flex items-center gap-3" onClick={handleClick}>
        <DeleteIcon
          sx={{
            height: '18px',
            width: '18px',
          }}
        />
        Excluir
      </MenuItem>
      <ButtonDialog.Root
        handleClick={handleClick}
        action={handleDeleteSong}
        open={open}
        text="Excluir Música"
      >
        <p className="dark:text-black">
          Tem certeza que deseja excluir a música? Esta ação não pode ser
          desfeita{' '}
        </p>
      </ButtonDialog.Root>
    </>
  )
}
