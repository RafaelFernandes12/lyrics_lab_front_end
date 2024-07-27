'use client'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RemoveIcon from '@mui/icons-material/Remove'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useState } from 'react'

const drawerWidth = 200

interface drawerComponentProps {
  tomUp: () => void
  tomDown: () => void
  children: React.ReactNode
}

export function DrawerComponent({
  children,
  tomUp,
  tomDown,
}: drawerComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <div className="m-0 p-0 dark:text-black">
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton>
            <ListItemIcon sx={{ width: 10, height: 10 }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Baixar PDF</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton>
            <ListItemIcon sx={{ width: 10, height: 10 }}>
              <DeleteIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Excluir</span>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton onClick={tomUp}>
            <ListItemIcon sx={{ width: 10, height: 10 }}>
              <AddIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Subir 1/2 tom</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton onClick={tomDown}>
            <ListItemIcon sx={{ width: 10, height: 10 }}>
              <RemoveIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">
              Diminuir 1/2 tom
            </span>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
  return (
    <div>
      <div className="flex h-screen w-screen gap-10 dark:text-black">
        <Drawer
          variant="permanent"
          className="max-sm:hidden"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: drawerWidth,
              position: 'relative',
              border: 'none',
              borderRadius: '12px',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        <div>
          <button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className="p-0 dark:text-white sm:hidden"
          >
            <MenuIcon />
          </button>
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
      <div className="h-full w-full sm:hidden">{children}</div>
      <Drawer
        anchor="bottom"
        variant="temporary"
        className="sm:hidden"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'full' },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  )
}
