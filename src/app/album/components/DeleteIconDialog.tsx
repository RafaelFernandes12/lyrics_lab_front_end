'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

export function DeleteIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <>
      <button onClick={handleClick} className="dark:bg-transparent ">
        <DeleteIcon className="h-5 w-5 dark:text-white" />
      </button>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Deletar Album</h2>
          <p className="dark:text-black">
            Tem certeza que deseja deletar a Album? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => clientDeleteAlbum(id)}
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
