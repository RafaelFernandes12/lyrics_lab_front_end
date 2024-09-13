'use client'
import { ButtonDialog } from '@/components/buttonDialog'
import { idProps } from '@/models/idProps'
import { changeName } from '@/operations/user/changeName'
import { MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EditNameItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  function handleClick() {
    setOpen(!open)
  }

  async function handleEditName() {
    await changeName(id, name).then(() => {
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <MenuItem
        sx={{
          padding: '0px',
          ':hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleClick}
      >
        Alterar o nome
      </MenuItem>

      <ButtonDialog.Root
        handleClick={handleClick}
        action={handleEditName}
        open={open}
        text="Alterar o nome"
      >
        <ButtonDialog.Input
          value={name}
          placeholder="Novo nome"
          state={(e) => setName(e.target.value)}
        />
      </ButtonDialog.Root>
    </>
  )
}
