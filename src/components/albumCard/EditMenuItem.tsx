'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { idProps, TAlbum, TSong, TUser } from '@/models'
import { get, put } from '@/services/axios'
import { storage } from '@/services/firebase'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImage'
import { MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonDialog } from '../buttonDialog/index'

export function EditMenuItem({ id, color }: idProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [songs, setSongs] = useState<TSong[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await get<{ user: TUser }>('/auth/user')
      return response.user
    },
  })

  const { data: album } = useQuery({
    queryKey: ['album', id],
    queryFn: async () => {
      return await get<TAlbum>(`album/${id}`)
    },
  })

  useEffect(() => {
    if (album) {
      setName(album.name)
      setDescription(album.description)
      setImage(album.image)
      setSongs(album?.songs || [])
    }
  }, [album])

  const handleEditAlbum = async () => {
    if (!file) {
      if (!name.trim()) {
        setError(true)
        return
      }
      await put<TAlbum>(`album/${id}`, {
        id,
        name,
        description,
        image,
        songs,
      }).then(() => {
        setError(false)
        router.refresh()
      })
      return
    }

    setUploading(true)

    const storageRef = ref(storage, `users/${user?.id}/${album?.id}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.log(
          error,
          'Falha no carregamento da imagem. Tente novamente mais tarde.',
        )
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        await put<TAlbum>(`album/${id}`, {
          id,
          name,
          description,
          image: url,
        }).then(() => {
          setUploading(false)
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

      await put<TAlbum>(`album/${id}`, {
        id,
        name,
        description,
        image: '',
        songs,
      }).then(() => {
        setUploading(false)
        setError(false)
        router.refresh()
      })

      album.image = ''
    } catch (error) {
      console.log(error, 'Falha ao remover imagem. Tente novamente mais tarde.')
    }
  }

  return (
    <ButtonDialog.Root
      action={handleEditAlbum}
      text="Editar Álbum"
      uploading={uploading}
      header={
        <MenuItem
          className={
            color
              ? `flex items-center gap-3 ${color}`
              : 'flex items-center gap-3'
          }
        >
          <EditIcon
            sx={{
              height: '18px',
              width: '18px',
            }}
          />
          Editar
        </MenuItem>
      }
      body={
        <>
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
          <ButtonDialog.SelectSongs song={songs} />
          <div className="flex flex-col gap-2">
            <UploadImage onFileSelect={(file) => setFile(file)} />
            {album?.image !== null && (
              <div>
                <button
                  onClick={handleDeleteAlbumImage}
                  className="flex items-center gap-2 rounded bg-gray-200 p-2 text-white"
                >
                  <HideImageIcon />
                  Remover imagem
                </button>
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-500">O nome não pode estar vazio!</p>
          )}
        </>
      }
    />
  )
}
