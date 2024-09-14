'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { ErrorHandler } from '@/helpers/ErrorHandler'
import { fetcher } from '@/lib/fetcher'
import { storage } from '@/lib/firebase'
import { albumProps } from '@/models/albumProps'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImage'
import { MenuItem } from '@mui/material'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ButtonDialog } from '../buttonDialog/index'

export function EditMenuItem({ id, color }: idProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [songIds, setSongIds] = useState<number[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)

  const { handleClick, open, setOpen } = ButtonDialog.useOpen()
  const router = useRouter()

  const { data: album } = useSWR<albumProps>(`/album/${id}`, fetcher)

  useEffect(() => {
    if (open && album) {
      setName(album.name)
      setDescription(album.description)
      setImage(album.image)
      setSongIds(album.songs.map((song) => song.id))
    }
  }, [open, album])

  const handleEditAlbum = async () => {
    if (!file) {
      if (!name.trim()) {
        setError(true)
        return
      }

      clientEditAlbum({ id, name, description, image, songIds }).then(() => {
        setOpen(false)
        setError(false)
        router.refresh()
      })
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
        ErrorHandler(
          error,
          'Falha no carregamento da imagem. Tente novamente mais tarde.',
        )
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        clientEditAlbum({ id, name, description, image: url }).then(() => {
          setUploading(false)
          setOpen(false)
          setError(false)
          router.refresh()
        })
      },
    )
  }

  const handleDeleteAlbumImage = async () => {
    try {
      if (!album?.image) return

      const decodedPath = decodeURIComponent(
        album.image.split('/o/')[1].split('?')[0],
      )

      const imageRef = ref(storage, decodedPath)

      await deleteObject(imageRef)

      await clientEditAlbum({ id, name, description, image: '', songIds }).then(
        () => {
          setUploading(false)
          setOpen(false)
          setError(false)
          router.refresh()
        },
      )

      album.image = ''
    } catch (error) {
      ErrorHandler(
        error,
        'Falha ao remover imagem. Tente novamente mais tarde.',
      )
    }
  }

  return (
    <div>
      <MenuItem
        className={
          color ? `flex items-center gap-3 ${color}` : 'flex items-center gap-3'
        }
        onClick={handleClick}
      >
        <EditIcon
          sx={{
            height: '18px',
            width: '18px',
          }}
        />
        Editar
      </MenuItem>

      <ButtonDialog.Root
        handleClick={handleClick}
        action={handleEditAlbum}
        open={open}
        text="Editar Álbum"
        uploading={uploading}
      >
        <ButtonDialog.Input
          value={name}
          placeholder="Nome"
          state={(e) => setName(e.target.value)}
        />
        <ButtonDialog.Input
          value={description}
          placeholder="Descrição"
          state={(e) => setDescription(e.target.value)}
        />
        <ButtonDialog.SelectSongs setSongIds={setSongIds} songIds={songIds} />
        <div className="flex flex-col gap-2">
          <UploadImage onFileSelect={(file) => setFile(file)} />
          {album?.image !== null && (
            <div>
              <button
                onClick={handleDeleteAlbumImage}
                className="flex items-center gap-2 rounded bg-redButton p-2 text-white"
              >
                <HideImageIcon />
                Remover imagem
              </button>
            </div>
          )}
        </div>
        {error && <p className="text-red-500">O nome não pode estar vazio!</p>}
      </ButtonDialog.Root>
    </div>
  )
}
