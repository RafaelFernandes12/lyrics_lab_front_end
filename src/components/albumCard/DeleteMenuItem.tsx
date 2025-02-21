'use client'

import { TAlbum, idProps } from '@/models'
import { del, get } from '@/services/axios'
import { storage } from '@/services/firebase'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { deleteObject, ref } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id, color }: idProps) {
  const router = useRouter()

  const { data: album } = useQuery({
    queryKey: ['album', id],
    queryFn: async () => {
      return await get<TAlbum>(`album/${id}`)
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
      console.log(error, 'Falha ao remover imagem. Tente novamente mais tarde.')
    } finally {
      await del<TAlbum>(`/album/`, id).then(() => {
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
