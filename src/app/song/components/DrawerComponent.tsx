'use client'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RemoveIcon from '@mui/icons-material/Remove'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
interface drawerComponentProps {
  toneUp: () => void
  toneDown: () => void
  textUp: () => void
  textDown: () => void
  pdfGenerator: () => void
}

export function DrawerComponent({
  toneUp,
  toneDown,
  pdfGenerator,
  textUp,
  textDown,
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
    <div className="p-4 dark:text-black">
      <ul className="flex w-full flex-col gap-2">
        <li>
          <button onClick={pdfGenerator} className="flex w-full gap-4">
            <PictureAsPdfIcon />
            <span className="p-0 text-sm dark:text-black">Baixar PDF</span>
          </button>
        </li>
        <li>
          <button onClick={pdfGenerator} className="flex w-full gap-4">
            <DeleteIcon />
            <span className="p-0 text-sm dark:text-black">Excluir</span>
          </button>
        </li>
      </ul>
      <Divider />
      <ul className="flex w-full flex-col">
        <li className="flex items-center justify-center gap-2">
          <button onClick={toneDown}>
            <RemoveIcon />
          </button>
          <span className="p-0 text-sm dark:text-black">Tom</span>
          <button onClick={toneUp}>
            <AddIcon />
          </button>
        </li>
        <li className="flex items-center justify-center gap-2">
          <button onClick={textDown}>
            <TextDecreaseIcon />
          </button>
          <span className="p-0 text-sm dark:text-black">Texto</span>
          <button onClick={textUp}>
            <TextIncreaseIcon />
          </button>
        </li>
      </ul>
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
