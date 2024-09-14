'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id, color }: idProps) {
  const router = useRouter()
  const { open, handleClick } = ButtonDialog.useOpen()

  function handleDeleteAlbum() {
    clientDeleteAlbum(id).then(() => {
      router.push('/dashboard')
      router.refresh()
    })
  }

  return (
    <div>
      <MenuItem
        className={
          color ? `flex items-center gap-3 ${color}` : 'flex items-center gap-3'
        }
        onClick={handleClick}
      >
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
        action={handleDeleteAlbum}
        open={open}
        text="Excluir álbum"
      >
        <p className="dark:text-black">
          Tem certeza que deseja excluir o álbum? Esta ação não pode ser
          desfeita
        </p>
      </ButtonDialog.Root>
    </div>
  )
}
