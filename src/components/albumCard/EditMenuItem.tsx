'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { fetcher } from '@/lib/fetcher'
import { storage } from '@/lib/firebase'
import { idProps } from '@/models/idProps'
import { clientEditAlbum } from '@/operations/albums/client-side/editAlbum'
import { MenuItem } from '@mui/material'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ButtonDialog } from '../buttonDialog/index'
import { albumProps } from '@/models/albumProps'

export function EditMenuItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [songIds, setSongIds] = useState<number[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const router = useRouter()
  const { handleClick, open, setOpen } = ButtonDialog.useOpen()

  const { data: album } = useSWR<albumProps>(`/album/${id}`, fetcher)

  useEffect(() => {
    if (open && album) {
      setName(album.name)
      setDescription(album.description)
      setSongIds(album.songs.map((song) => song.id))
    }
  }, [open, album])
  const handleEditAlbum = async () => {
    if (!file) {
      clientEditAlbum({ id, name, description, image: '', songIds }).then(() =>
        router.refresh(),
      )
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
        clientEditAlbum({ id, name, description, image: url }).then(() =>
          router.refresh(),
        )
        setUploading(false)
        setOpen(false)
      },
    )
  }

  return (
    <div>
      <MenuItem onClick={handleClick}>Editar</MenuItem>
      <ButtonDialog.Root handleClick={handleClick} action={handleEditAlbum} open={open} text='Editar Album' uploading={uploading}>
          <ButtonDialog.Input
              value={name}
              placeholder="Nome"
              state={(e) => setName(e.target.value)}
            />
            <ButtonDialog.Input
              value={description}
              placeholder="Tom"
              state={(e) => setDescription(e.target.value)}
            />
            <ButtonDialog.SelectSongs setSongIds={setSongIds} songIds={songIds}/>
            <div>
              <UploadImage onFileSelect={(file) => setFile(file)} />
            </div>
        </ButtonDialog.Root>
      </div>
  )
}
