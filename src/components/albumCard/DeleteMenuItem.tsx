'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import { DialogContent, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

export function DeleteMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <>
      <MenuItem onClick={handleClick} className="dark:bg-transparent ">
        Excluir
      </MenuItem>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Excluir álbum</h2>
          <p className="dark:text-black">
            Tem certeza que deseja excluir o álbum? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => clientDeleteAlbum(id)}
              className="bg-blue-800 p-2 text-white"
            >
              Excluir
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
