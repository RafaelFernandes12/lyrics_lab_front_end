'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { ButtonDialog } from '@/components/buttonDialog/index'
import { AuthContext } from '@/contexts/AuthContext'
import { fetcher } from '@/lib/fetcher'
import { storage } from '@/lib/firebase'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'

export function EditIconDialog({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [songIds, setSongIds] = useState<number[]>([])
  const { user } = useContext(AuthContext)
  const { data: album } = useSWR(`/album/${id}`, fetcher)

  useEffect(() => {
    if (open && album) {
      setName(album.name)
      setDescription(album.description)
    }
  }, [open, album])
  const router = useRouter()
  function handleClick() {
    setOpen(!open)
  }

  const handleEditAlbum = async () => {
    if (!file) {
      clientEditAlbum({ id, name, description, image: '', songIds }).then(() =>
        router.refresh(),
      )
      return
    }

    setUploading(true)

    const storageRef = ref(storage, `users/${user?.id}/${id}`)
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
        clientEditAlbum({ id, name, description, image: url, songIds }).then(
          () => {
            setUploading(false)
            setOpen(false)
            router.refresh()
          },
        )
        setUploading(false)
        setOpen(false)
      },
    )
  }

  const handleDeleteAlbumImage = async () => {
    try {
      const decodedPath = decodeURIComponent(
        album.image.split('/o/')[1].split('?')[0],
      )
      const imageRef = ref(storage, decodedPath)

      await deleteObject(imageRef)

      await clientEditAlbum({ id, name, description, image: '', songIds }).then(
        () => {
          setUploading(false)
          setOpen(false)
          router.refresh()
        },
      )
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error)
    }
  }

  return (
    <>
      <button
        className="flex items-center dark:bg-transparent"
        onClick={handleClick}
      >
        <EditIcon className="m-2 h-5 w-5 dark:text-white" />
        <p>Editar</p>
      </button>
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
            <ButtonDialog.Select
              url="song"
              title="Músicas"
              dataIds={songIds}
              setDataIds={(value) => setSongIds(value)}
            />
            <div>
              <UploadImage onFileSelect={(file) => setFile(file)} />
            </div>
            <div>
              <button
                onClick={() => handleDeleteAlbumImage()}
                className="flex items-center gap-2 rounded bg-redButton p-2 text-white"
                disabled={uploading}
              >
                <DeleteIcon />
                Excluir imagem
              </button>
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
