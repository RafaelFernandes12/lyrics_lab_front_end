'use client'
import CloseIcon from '@mui/icons-material/Close'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

interface rootProps {
  text: string
  action: () => void
  header: React.ReactNode
  body: React.ReactNode
  uploading?: boolean
}

export function Root(props: rootProps) {
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }
  if (!open) return <div onClick={handleClick}>{props.header}</div>
  return (
    <Dialog open={open} onClose={handleClick} maxWidth="lg">
      <DialogContent className="flex flex-col items-center justify-center gap-4">
        <button className="flex w-full justify-end pb-0" onClick={handleClick}>
          <CloseIcon className="h-4 w-4" />
        </button>
        <h2 className="dark:text-black">{props.text}</h2>
        <div className="flex flex-col gap-4">{props.body}</div>
        <div className="mt-3 flex w-full items-center justify-center gap-2">
          <button
            onClick={props.action}
            data-testid="actionButton"
            className="bg-blueButton p-2 text-white"
            disabled={props.uploading}
          >
            {props.uploading ? 'Carregando...' : 'Confirmar'}
          </button>
          <button onClick={handleClick} className="bg-redButton p-2 text-white">
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
