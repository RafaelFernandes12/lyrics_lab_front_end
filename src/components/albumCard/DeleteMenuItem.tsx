'use client'

import { ErrorHandler } from '@/helpers/ErrorHandler'
import { storage } from '@/lib/firebase'
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
  const { open, handleClick } = ButtonDialog.useOpen()

  useEffect(() => {
    const fetchAlbum = async () => {
      const fetchedAlbum = await clientGetOneAlbum(id)
      setAlbum(fetchedAlbum)
    }

    fetchAlbum()
  }, [])

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
      clientDeleteAlbum(id).then(() => {
        router.push('/dashboard')
        router.refresh()
      })
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
        <DeleteIcon
          sx={{
            height: '18px',
            width: '18px',
          }}
        />
        Excluir
      </MenuItem>
      <ButtonDialog.Root
        handleClick={handleClick}
        action={handleDeleteAlbum}
        open={open}
        text="Excluir álbum"
      >
        <p className="dark:text-black">
          Tem certeza que deseja excluir o álbum? Esta ação não pode ser
          desfeita
        </p>
      </ButtonDialog.Root>
    </div>
  )
}
