'use client'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

interface rootProps {
  text: string
  action: () => void
  children: React.ReactNode
}

export function ButtonDialogRoot({ action, text, children }: rootProps) {
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }

  return (
    <>
      <button
        className="flex items-center gap-2 bg-blue-800 p-3"
        onClick={handleClick}
      >
        <AddIcon className="text-white" />
        <span className="text-white max-sm:hidden">{text}</span>
      </button>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <button className="flex w-full justify-end pb-0" onClick={handleClick}>
          <CloseIcon className="h-4 w-4" />
        </button>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">{text}</h2>
          <div className="flex flex-col gap-4 ">{children}</div>
          <div className="flex w-full items-center justify-center gap-2">
            <button onClick={action} className="bg-blue-800 p-2 text-white">
              Criar
            </button>
            <button onClick={handleClick} className="bg-red-800 p-2 text-white">
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
