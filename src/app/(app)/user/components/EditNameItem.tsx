'use client'
import { idProps } from '@/models/idProps'
import { changeName } from '@/operations/auth/changeName'
import { Dialog, DialogContent, MenuItem } from '@mui/material'
import { useState } from 'react'

export function EditNameItem({ id }: idProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  function handleClick() {
    setOpen(!open)
  }

  function handleEditName() {
    changeName(id, name)
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
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Alterar o nome</h2>
          <div className="flex flex-col gap-4 ">
            <input
              placeholder="Novo nome"
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-[1px] border-black p-2"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={handleEditName}
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
