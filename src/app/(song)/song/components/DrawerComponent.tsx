'use client'

import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RemoveIcon from '@mui/icons-material/Remove'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import { Divider } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'

interface drawerComponentProps {
  toneUp: () => void
  toneDown: () => void
  textUp: () => void
  textDown: () => void
  pdfGenerator: () => void
  sharpChord: () => void
  flatChord: () => void
}
interface listProps {
  action: () => void
  icon?: React.ReactNode
  text?: string
}

function ListItem({ action, icon, text }: listProps) {
  return (
    <button onClick={action} className="flex w-full gap-4">
      {icon}
      <span className="p-0 text-sm">{text}</span>
    </button>
  )
}

export function DrawerComponent({
  toneUp,
  toneDown,
  pdfGenerator,
  textUp,
  textDown,
  sharpChord,
  flatChord,
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
    <div className="p-4 dark:bg-black dark:text-white">
      <ul className="flex w-full flex-col gap-2">
        <li>
          <ListItem
            action={pdfGenerator}
            icon={<PictureAsPdfIcon />}
            text="Gerar PDF"
          />
        </li>
      </ul>
      <Divider className="h-2 w-full border-black dark:border-white dark:text-white" />
      <ul className="flex w-full flex-col">
        <li className="flex items-center justify-center gap-2">
          <ListItem action={toneDown} icon={<RemoveIcon />} />
          <span className="p-0 text-sm">Tom</span>
          <ListItem action={toneUp} icon={<AddIcon />} />
        </li>
        <li className="flex items-center justify-center gap-2">
          <ListItem action={textDown} icon={<TextDecreaseIcon />} />
          <span className="p-0 text-sm">Texto</span>
          <ListItem action={textUp} icon={<TextIncreaseIcon />} />
        </li>
      </ul>
      <Divider className="h-2 w-full border-black dark:border-white dark:text-white" />
      <ul className="flex w-full flex-col">
        <li className="flex items-center justify-between">
          <ListItem action={flatChord} text="A#" />
          <ListItem action={sharpChord} text="Ab" />
        </li>
      </ul>
    </div>
  )
  return (
    <>
      <div className="fixed dark:text-black">
        <Drawer
          variant="permanent"
          className="max-md:hidden"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              position: 'relative',
              border: 'none',
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
