'use client'
<<<<<<< HEAD

import { ButtonDialog } from '@/components/buttonDialog'
import { idProps } from '@/models'
import { changeName } from '@/services/axios'
import { MenuItem } from '@mui/material'
import { getCookie } from 'cookies-next'
=======
import { ButtonDialog } from '@/components/buttonDialog'
import { idProps } from '@/models/idProps'
import { changeName } from '@/operations/user/changeName'
import { MenuItem } from '@mui/material'
>>>>>>> main
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EditNameItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

<<<<<<< HEAD
=======

>>>>>>> main
  async function handleEditName() {
    if (!name.trim()) {
      setError(true)
      return
    }
<<<<<<< HEAD
    const token = (await getCookie('jwt')) || ''
    await changeName(id, name, token).then(() => {
=======

    await changeName(id, name).then(() => {
>>>>>>> main
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
<<<<<<< HEAD
=======

>>>>>>> main
          <ButtonDialog.Input
            value={name}
            placeholder="Novo nome"
            state={(e) => setName(e.target.value)}
          />
<<<<<<< HEAD
          {error && (
            <p className="text-red-500">O nome não pode estar vazio!</p>
          )}
=======
          {error && <p className="text-red-500">O nome não pode estar vazio!</p>}
>>>>>>> main
        </>
      }
    />
  )
}
