'use client'

import { ButtonDialog } from '@/components/buttonDialog'
import { idProps } from '@/models'
import { changeName } from '@/services/axios'
import { MenuItem } from '@mui/material'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EditNameItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleEditName() {
    try {
      if (!name.trim()) {
        setError(true)
        return
      }
      await changeName(id, name)
      router.refresh()
      message.success('Nome alterado com sucesso!')
    } catch (error) {
      message.error('Erro ao alterar o nome.')
    }
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
