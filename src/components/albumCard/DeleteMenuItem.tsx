'use client'

import { ErrorHandler } from '@/helpers/ErrorHandler'
import { storage } from '@/lib/firebase'
<<<<<<< HEAD
import { TAlbum, idProps } from '@/models'
import { del, get } from '@/services/axios'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { deleteObject, ref } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id, color }: idProps) {
  const [album, setAlbum] = useState<TAlbum>({} as TAlbum)

  const router = useRouter()

  useQuery({
    queryKey: ['album'],
    queryFn: async () => {
      const token = (await getCookie('jwt')) || ''
      const response = await get<TAlbum>(`/album/${id}`, token)
      setAlbum(response)
    },
  })
=======
import { albumProps } from '@/models/albumProps'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import { clientGetOneAlbum } from '@/operations/albums/client-side/getOne'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { deleteObject, ref } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id, color }: idProps) {
  const [album, setAlbum] = useState<albumProps | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchAlbum = async () => {
      const fetchedAlbum = await clientGetOneAlbum(id)
      setAlbum(fetchedAlbum)
    }

    fetchAlbum()
  }, [])
>>>>>>> main

  async function handleDeleteAlbum() {
    try {
      if (!album?.image) return

      const decodedPath = decodeURIComponent(
        album.image.split('/o/')[1].split('?')[0],
      )

      const imageRef = ref(storage, decodedPath)

      await deleteObject(imageRef)

      album.image = ''
    } catch (error) {
      ErrorHandler(
        error,
        'Falha ao remover imagem. Tente novamente mais tarde.',
      )
    } finally {
<<<<<<< HEAD
      const token = (await getCookie('jwt')) || ''
      await del<TAlbum>(`/album/`, id, token).then(() => {
=======
      clientDeleteAlbum(id).then(() => {
>>>>>>> main
        router.push('/dashboard')
        router.refresh()
      })
    }
  }

  return (
<<<<<<< HEAD
=======

>>>>>>> main
    <ButtonDialog.Root
      action={handleDeleteAlbum}
      text="Excluir álbum"
      header={
        <MenuItem
          className={
<<<<<<< HEAD
            color
              ? `flex items-center gap-3 ${color}`
              : 'flex items-center gap-3'
=======
            color ? `flex items-center gap-3 ${color}` : 'flex items-center gap-3'
>>>>>>> main
          }
        >
          <DeleteIcon
            sx={{
              height: '18px',
              width: '18px',
            }}
          />
          Excluir
        </MenuItem>
<<<<<<< HEAD
=======

>>>>>>> main
      }
      body={
        <p className="dark:text-black">
          Tem certeza que deseja excluir o álbum? Esta ação não pode ser
          desfeita
        </p>
      }
    />
<<<<<<< HEAD
=======

>>>>>>> main
  )
}
