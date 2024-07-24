'use client'
import { postPlaylist } from '@/operations/playlistRoutes/postPlaylist'
import AddIcon from '@mui/icons-material/Add'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

export function CreateSongDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  function handleClick() {
    setOpen(!open)
  }
  function handleCreatePlaylist() {
    postPlaylist(name, description)
  }
  return (
    <>
      <button
        className="flex items-center gap-2 bg-blue-800 p-3"
        onClick={handleClick}
      >
        <AddIcon className="text-white" />
        <span className="text-white max-sm:hidden">Adicionar playlist</span>
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
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleCreatePlaylist}
              className="bg-blue-800 p-2 text-white"
            >
              Criar
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
