'use client'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import EditIcon from '@mui/icons-material/Edit'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

export function EditIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleClick() {
    setOpen(!open)
  }

  function handleEditAlbum() {
    clientEditAlbum({ id, name, description })
  }

  return (
    <>
      <div
        className="flex items-center dark:bg-transparent"
        onClick={handleClick}
      >
        <EditIcon className="m-2 h-5 w-5 dark:text-white" />
        <p>Editar</p>
      </div>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Editar álbum</h2>
          <div className="flex flex-col gap-4 ">
            <input
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
            <input
              placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleEditAlbum}
              className="bg-blue-800 p-2 text-white"
            >
              Editar
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
