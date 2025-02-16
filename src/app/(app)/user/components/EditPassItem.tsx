'use client'
<<<<<<< HEAD

import { ButtonDialog } from '@/components/buttonDialog'
import { changePassword } from '@/services/axios'
import { MenuItem } from '@mui/material'
import { getCookie } from 'cookies-next'
=======
import { ButtonDialog } from '@/components/buttonDialog'
import { changePassword } from '@/operations/user/changePassword'
import { MenuItem } from '@mui/material'
>>>>>>> main
import { useState } from 'react'

interface editPassItemProps {
  email: string
}

export function EditPassItem({ email }: editPassItemProps) {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [error, setError] = useState('')

<<<<<<< HEAD
  async function handleEditPass() {
=======
  function handleClick() {
    setError('')
  }

  function handleEditPass() {
>>>>>>> main
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
<<<<<<< HEAD

    const token = (await getCookie('jwt')) || ''
    changePassword(email, oldPass, newPass, token)
  }

  return (
=======
    changePassword(email, oldPass, newPass)
  }

  return (

>>>>>>> main
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
<<<<<<< HEAD
=======

>>>>>>> main
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
