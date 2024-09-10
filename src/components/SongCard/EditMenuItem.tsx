'use client'
import { idProps } from '@/models/idProps'
import { clientEditSong } from '@/operations/songs/client-side/editSong'
import { Dialog, DialogContent, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonDialogSelect } from '../buttonDialog/ButtonDialogSelect'

export function EditMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albumIds, setAlbumIds] = useState<number[]>([])
  const router = useRouter()

  function handleClick() {
    setOpen(!open)
  }

  function handleEditSong() {
    clientEditSong({ id, name, tone, albumIds }).then(() => router.refresh())
  }

  return (
    <>
      <MenuItem onClick={handleClick}>Editar</MenuItem>
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
              placeholder="Tom"
              onChange={(e) => setTone(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
            <ButtonDialogSelect
              url="album"
              title="albums"
              dataIds={albumIds}
              setDataIds={(value) => setAlbumIds(value)}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleEditSong}
              className="bg-blueButton p-2 text-white"
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
