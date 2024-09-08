'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  function handleClick() {
    setOpen(!open)
  }

  function handleDeleteAlbum() {
    clientDeleteAlbum(id).then(() => router.push('/albums')).then(() => router.refresh())
  }

  return (
    <>
      <button
        className="flex items-center dark:bg-transparent "
        onClick={handleClick}
      >
        <DeleteIcon className="m-2 h-5 w-5 dark:text-white" />
        <p>Excluir</p>
      </button>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Excluir álbum</h2>
          <p className="dark:text-black">
            Tem certeza que deseja excluir o álbum? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAlbum}
              className="bg-blue-800 p-2 text-white"
            >
              Deletar
            </button>
            <button onClick={handleClick} className="bg-red-800 p-2 text-white">
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
