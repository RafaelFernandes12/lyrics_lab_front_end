'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { storage } from '@/lib/firebase'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import EditIcon from '@mui/icons-material/Edit'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'

export function EditIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  const handleEditAlbum = async () => {
    if (!file) {
      clientEditAlbum({ id, name, description, image: '' })
      return
    }

    setUploading(true)

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (error) => {
        console.error('Upload failed:', error)
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        clientEditAlbum({ id, name, description, image: url })
        setUploading(false)
        setOpen(false)
      },
    )
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
            <div>
              <UploadImage onFileSelect={(file) => setFile(file)} />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleEditAlbum}
              className="bg-blue-800 p-2 text-white"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Editar'}
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
