'use client'
import { ButtonDialog } from '@/components/buttonDialog'
import { changePassword } from '@/operations/user/changePassword'
import { MenuItem } from '@mui/material'
import { useState } from 'react'

interface editPassItemProps {
  email: string
}

export function EditPassItem({ email }: editPassItemProps) {
  const [open, setOpen] = useState(false)
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [error, setError] = useState('')

  function handleClick() {
    setOpen(!open)
    setError('')
  }

  function handleEditPass() {
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
        Alterar a senha
      </MenuItem>

      <ButtonDialog.Root
        handleClick={handleClick}
        action={handleEditPass}
        open={open}
        text="Alterar a senha"
      >
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
      </ButtonDialog.Root>
    </>
  )
}
