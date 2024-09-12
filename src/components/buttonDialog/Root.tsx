'use client'
import CloseIcon from '@mui/icons-material/Close'
import { DialogContent } from '@mui/material'
import Dialog from '@mui/material/Dialog'

interface rootProps {
  open: boolean
  handleClick: () => void
  text: string
  action: () => void
  children: React.ReactNode
  uploading?: boolean
}

export function Root({
  open,
  handleClick,
  action,
  text,
  children,
  uploading,
}: rootProps) {
  return (
    <>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <button className="flex w-full justify-end pb-0" onClick={handleClick}>
          <CloseIcon className="h-4 w-4" />
        </button>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">{text}</h2>
          <div className="flex flex-col gap-4 ">{children}</div>
          <div className="flex w-full items-center justify-center gap-2">
            <button
              onClick={action}
              className="bg-[#567EBB] p-2 text-white"
              disabled={uploading}
            >
              Confirmar
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
