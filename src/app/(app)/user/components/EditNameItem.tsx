'use client'

import { ButtonDialog } from '@/components/buttonDialog'
import { idProps } from '@/models'
import { changeName } from '@/services/axios'
import { MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EditNameItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleEditName() {
    if (!name.trim()) {
      setError(true)
      return
    }
    await changeName(id, name).then(() => {
      router.refresh()
    })
  }

  return (
    <ButtonDialog.Root
      action={handleEditName}
      text="Alterar o nome"
      header={
        <MenuItem
          sx={{
            padding: '0px',
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          Alterar o nome
        </MenuItem>
      }
      body={
        <>
          <ButtonDialog.Input
            value={name}
            placeholder="Novo nome"
            state={(e) => setName(e.target.value)}
          />
          {error && (
            <p className="text-red-500">O nome não pode estar vazio!</p>
          )}
        </>
      }
    />
  )
}
