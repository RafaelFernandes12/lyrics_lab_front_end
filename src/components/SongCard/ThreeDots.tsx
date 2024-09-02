'use client'
import { idProps } from '@/models/idProps'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu } from '@mui/material'
import { useState } from 'react'
import { DeleteMenuItem } from './DeleteMenuItem'
import { EditMenuItem } from './EditMenuItem'

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
        <EditMenuItem id={id} />
        <DeleteMenuItem id={id} />
      </Menu>
    </div>
  )
}
