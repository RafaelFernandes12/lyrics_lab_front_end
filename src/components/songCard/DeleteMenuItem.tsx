'use client'

import { idProps } from '@/models'
import { clientDeleteSong } from '@/operations/songs/client-side/delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id }: idProps) {
  const router = useRouter()

  function handleDeleteSong() {
    clientDeleteSong(id).then(() => router.refresh())
  }
  return (
    <ButtonDialog.Root
      action={handleDeleteSong}
      text="Excluir Música"
      header={
        <MenuItem className="flex items-center gap-3">
          <DeleteIcon
            sx={{
              height: '18px',
              width: '18px',
            }}
          />
          Excluir
        </MenuItem>
      }
      body={
        <p className="dark:text-black">
          Tem certeza que deseja excluir a música? Esta ação não pode ser
          desfeita{' '}
        </p>
      }
    />
  )
}
