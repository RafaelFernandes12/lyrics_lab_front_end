'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteAlbum } from '@/operations/albums/client-side/delete'
import { DialogContent, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ButtonDialog } from '../buttonDialog'
export function DeleteMenuItem({ id }: idProps) {
  const router = useRouter()
  const {open, handleClick} = ButtonDialog.useOpen()
  function handleDeleteAlbum() {
    clientDeleteAlbum(id).then(() => {
      router.refresh()
    })
  }
  return (
    <div>
      <MenuItem onClick={handleClick}>Editar</MenuItem>
      <ButtonDialog.Root handleClick={handleClick} action={handleDeleteAlbum} open={open} text='Deletar Album'>
        <p className="dark:text-black">Tem certeza que deseja excluir o álbum? Esta ação não pode ser
          desfeita 
        </p>
      </ButtonDialog.Root>
    </div>
  )
}
