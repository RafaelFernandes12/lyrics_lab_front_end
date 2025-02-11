'use client'

import { ErrorHandler } from '@/helpers/ErrorHandler'
import { storage } from '@/lib/firebase'
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
      const token = (await getCookie('jwt')) || ''
      await del<TAlbum>(`/album/`, id, token).then(() => {
        router.push('/dashboard')
        router.refresh()
      })
    }
  }

  return (
    <ButtonDialog.Root
      action={handleDeleteAlbum}
      text="Excluir álbum"
      header={
        <MenuItem
          className={
            color
              ? `flex items-center gap-3 ${color}`
              : 'flex items-center gap-3'
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
      }
      body={
        <p className="dark:text-black">
          Tem certeza que deseja excluir o álbum? Esta ação não pode ser
          desfeita
        </p>
      }
    />
  )
}
