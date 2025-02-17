'use client'

import { ButtonDialog } from '@/components/buttonDialog'
import { changePassword } from '@/services/axios'
import { MenuItem } from '@mui/material'
import { useState } from 'react'

interface editPassItemProps {
  email: string
}

export function EditPassItem({ email }: editPassItemProps) {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [error, setError] = useState('')

  async function handleEditPass() {
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/

    if (!oldPass.trim()) {
      setError('A senha atual não pode estar vazia!')
      return
    }

    if (!newPass.trim()) {
      setError('A nova senha não pode estar vazia!')
      return
    }

    if (oldPass === newPass) {
      setError('A nova senha não pode ser igual à atual')
      return
    }

    if (!passwordRegex.test(newPass)) {
      setError(
        'Senha inválida: a senha deve conter no mínimo 8 caracteres com apenas letras e números',
      )
      return
    }

    setError('')

    changePassword(email, oldPass, newPass)
  }

  return (
    <ButtonDialog.Root
      action={handleEditPass}
      text="Alterar a senha"
      header={
        <MenuItem
          sx={{
            padding: '0px',
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          Alterar a senha
        </MenuItem>
      }
      body={
        <>
          <ButtonDialog.Input
            value={oldPass}
            type="password"
            placeholder="Senha atual"
            state={(e) => setOldPass(e.target.value)}
          />
          <ButtonDialog.Input
            value={newPass}
            type="password"
            placeholder="Nova senha"
            state={(e) => setNewPass(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}
        </>
      }
    />
  )
}
