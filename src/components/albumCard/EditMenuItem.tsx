'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { fetcher } from '@/lib/fetcher'
import { storage } from '@/lib/firebase'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import { DialogContent, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ButtonDialogSelect } from '../buttonDialog/ButtonDialogSelect'

export function EditMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [songIds, setSongIds] = useState<number[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const router = useRouter()
  function handleClick() {
    setOpen(!open)
  }

  const { data: album } = useSWR(`/album/${id}`, fetcher)

  useEffect(() => {
    if (open && album) {
      setName(album.name)
      setDescription(album.description)
    }
  }, [open, album])

  const handleEditAlbum = async () => {
    if (!file) {
      clientEditAlbum({ id, name, description, image: '' }).then(() => router.refresh())
      return
    }

    setUploading(true)

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.error('Upload failed:', error)
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        clientEditAlbum({ id, name, description, image: url }).then(() => router.refresh())
        setUploading(false)
        setOpen(false)
      },
    )
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
            <input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
            <ButtonDialogSelect
              url='song'
              title='Músicas'
              dataIds={songIds}
              setDataIds={(value) => setSongIds(value)}
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
