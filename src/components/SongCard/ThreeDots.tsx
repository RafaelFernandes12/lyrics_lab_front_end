'use client'
import { idProps } from '@/models/idProps'
import { clientDeleteSong } from '@/operations/songs/client-side/delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DialogContent, IconButton, Menu, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

export function ThreeDots({ id }: idProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className="text-white" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>Editar</MenuItem>
        <DeleteMenuItem id={id} />
      </Menu>
    </div>
  )
}

function DeleteMenuItem({ id }: idProps) {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <>
      <MenuItem onClick={handleClick} className="dark:bg-transparent ">
        Deletar
      </MenuItem>
      <Dialog open={open} onClose={handleClick} maxWidth="lg">
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <h2 className="dark:text-black">Deletar Song</h2>
          <p className="dark:text-black">
            Tem certeza que deseja deletar a Song? Esta ação não pode ser
            desfeita
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => clientDeleteSong(id)}
              className="bg-blue-800 p-2 text-white"
            >
              Deletar
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
