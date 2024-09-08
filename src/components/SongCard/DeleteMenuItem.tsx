'use client'

import { idProps } from '@/models/idProps'
import { clientDeleteSong } from '@/operations/songs/client-side/delete'
import { DialogContent, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export function DeleteMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  function handleClick() {
    setOpen(!open)
  }
  function handleDeleteSong(){
    clientDeleteSong(id).then(() => router.refresh())
  }
  return (
    <>
      <MenuItem onClick={handleClick} className="dark:bg-transparent ">
        Excluir
      </MenuItem>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Excluir música</h2>
          <p className="dark:text-black">
            Tem certeza que deseja excluir a música? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteSong}
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
