'use client'
import { idProps } from '@/models/idProps'
import { deletePlaylist } from '@/operations/playlistRoutes/deletePlaylist'
import DeleteIcon from '@mui/icons-material/Delete'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { useState } from 'react'

export function DeleteIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const cookies = parseCookies()
  const token = cookies.lltoken

  function handleClick() {
    setOpen(!open)
  }

  function handleDeletePlaylist() {
    deletePlaylist(id, token).then(() => {
      router.push('/playlists')
    })
  }

  return (
    <>
      <button onClick={handleClick} className="dark:bg-transparent ">
        <DeleteIcon className="h-5 w-5 dark:text-white" />
      </button>
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
