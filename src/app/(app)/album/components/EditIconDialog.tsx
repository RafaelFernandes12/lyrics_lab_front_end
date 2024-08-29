'use client'
import { idProps } from '@/models/idProps'
import { editAlbum } from '@/operations/albumRoutes/editAlbum'
import EditIcon from '@mui/icons-material/Edit'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { parseCookies } from 'nookies'
import { useState } from 'react'

export function EditIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const cookies = parseCookies()
  const token = cookies.lltoken

  function handleClick() {
    setOpen(!open)
  }

  function handleEditAlbum() {
    editAlbum(id, name, description, token)
  }
  return (
    <>
      <button onClick={handleClick}>
        <EditIcon className="h-5 w-5 dark:text-white" />
      </button>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Criar Album</h2>
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
          <button onClick={handleEditAlbum}>Editar</button>
          <button onClick={handleClick}>Cancelar</button>
        </div>
      </Dialog>
    </>
  )
}
