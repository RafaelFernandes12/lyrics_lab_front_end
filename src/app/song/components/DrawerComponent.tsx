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
  toneUp: () => void
  toneDown: () => void
  pdfGenerator: () => void
}

export function DrawerComponent({
  toneUp,
  toneDown,
  pdfGenerator,
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
          <ListItemButton onClick={pdfGenerator}>
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Baixar PDF</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Excluir</span>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton onClick={toneUp}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <span className="p-0 text-sm dark:text-black">Subir 1/2 tom</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton onClick={toneDown}>
            <ListItemIcon>
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
    <>
      <div className="dark:text-black">
        <Drawer
          variant="permanent"
          className="max-md:hidden"
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
            className="p-0 dark:text-white md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
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
    </>
  )
}
