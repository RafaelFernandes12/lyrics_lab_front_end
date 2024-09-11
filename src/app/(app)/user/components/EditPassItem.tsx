'use client'
import { changePassword } from '@/operations/auth/changePassword'
import { Dialog, DialogContent, MenuItem } from '@mui/material'
import { useState } from 'react'

interface editPassItemProps {
  email: string
}

export function EditPassItem({ email }: editPassItemProps) {
  const [open, setOpen] = useState(false)
  const [oldPass, setName] = useState('')
  const [newPass, setTone] = useState('')

  function handleClick() {
    setOpen(!open)
  }

  function handleEditPass() {
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
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Alterar a senha</h2>
          <div className="flex flex-col gap-4 ">
            <input
              placeholder="Senha atual"
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
            <input
              placeholder="Nova senha"
              onChange={(e) => setTone(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleEditPass}
              className="bg-blueButton p-2 text-white"
            >
              Alterar
            </button>
            <button onClick={handleClick} className="bg-red-500 p-2 text-white">
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
