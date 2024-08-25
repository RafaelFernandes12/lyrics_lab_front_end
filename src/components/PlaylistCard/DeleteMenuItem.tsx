'use client'
import { idProps } from '@/models/idProps'
import { deletePlaylist } from '@/operations/playlistRoutes/deletePlaylist'
import { DialogContent, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { parseCookies } from 'nookies'
import { useState } from 'react'

export function DeleteMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)

  const cookies = parseCookies()
  const token = cookies.lltoken

  function handleClick() {
    setOpen(!open)
  }

  function handleDeletePlaylist() {
    deletePlaylist(id, token)
    location.reload()
  }

  return (
    <>
      <MenuItem onClick={handleClick} className="dark:bg-transparent ">
        Deletar
      </MenuItem>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Deletar playlist</h2>
          <p className="dark:text-black">
            Tem certeza que deseja deletar a playlist? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeletePlaylist}
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
