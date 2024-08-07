'use client'
import { idProps } from '@/models/idProps'
import { editPlaylist } from '@/operations/playlistRoutes/editPlaylist'
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
  function handleEditPlaylist() {
    editPlaylist(id, name, description)
  }
  return (
    <>
      <button onClick={handleClick}>
        <EditIcon className="h-5 w-5 dark:text-white" />
      </button>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Criar playlist</h2>
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
        </DialogContent>
        <div className="flex w-full items-center justify-center gap-2">
          <button onClick={handleEditPlaylist}>Editar</button>
          <button onClick={handleClick}>Cancelar</button>
        </div>
      </Dialog>
    </>
  )
}
