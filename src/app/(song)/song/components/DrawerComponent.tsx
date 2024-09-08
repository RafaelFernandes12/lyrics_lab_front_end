'use client'

import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RemoveIcon from '@mui/icons-material/Remove'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Drawer from '@mui/material/Drawer'
import Link from 'next/link'
import { useState } from 'react'

interface drawerComponentProps {
  toneUp: () => void
  toneDown: () => void
  textUp: () => void
  textDown: () => void
  pdfGenerator: () => void
  sharpChord: () => void
  flatChord: () => void
  songId: number
}
interface listProps {
  action: () => void
  icon?: React.ReactNode
  text?: string
}

const sharpChords = 'sharpChords'
const flatChords = 'flatChords'

function ListItem({ action, icon, text }: listProps) {
  return (
    <button onClick={action} className="m-0 p-0 w-fit">
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
  songId,
}: drawerComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(true)
  const [isClosing, setIsClosing] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => setIsClosing(false)

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }
  const chordTypeStorage = `chordType/song${songId}/user${7}}`

  function sharpChordType() {
    localStorage.setItem(chordTypeStorage, sharpChords)
    sharpChord()
  }
  function flatChordType() {
    localStorage.setItem(chordTypeStorage, flatChords)
    flatChord()
  }
  const chordType = localStorage.getItem(chordTypeStorage)

  const isSharpOrFlat = chordType === sharpChords ? sharpChords : flatChords
  const drawer = (
    <ul className="dark:bg-black dark:text-white flex flex-col">
        <li className="flex items-center justify-center gap-3 py-4 px-6 border-b-[1px] border-gray-400 hover:bg-slate-200 ">
          <ListItem
            action={pdfGenerator}
            icon={<PictureAsPdfIcon />}
            text="Gerar PDF"
          />
        </li>
        <li className="flex items-center justify-center gap-3 py-4 px-6 border-b-[1px] border-gray-400 hover:bg-slate-200 ">
          <ListItem action={toneDown} icon={<RemoveIcon />} />
          <span className="p-0 text-sm">Tom</span>
          <ListItem action={toneUp} icon={<AddIcon />} />
        </li>
        <li className="flex items-center justify-center gap-3 py-4 px-6 border-b-[1px] border-gray-400 hover:bg-slate-200 ">
          <ListItem action={textDown} icon={<TextDecreaseIcon />} />
          <span className="p-0 text-sm">Texto</span>
          <ListItem action={textUp} icon={<TextIncreaseIcon />} />
        </li>
        <li className="flex items-center justify-center gap-3 py-4 px-6 hover:bg-slate-200 ">
          <IconButton id="long-button" onClick={handleClick} className='p-0 m-0 text-base'>
            {isSharpOrFlat === sharpChords ? <span>A#</span> : <span>Ab</span>}
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
            <MenuItem onClick={sharpChordType}>
              <Checkbox checked={isSharpOrFlat === sharpChords} />
              A# | C# | D# | F# | G#
            </MenuItem>
            <MenuItem onClick={flatChordType}>
              <Checkbox checked={isSharpOrFlat === flatChords} />
              Bb | Db | Eb | Gb | Ab
            </MenuItem>
          </Menu>
        </li>
    </ul>
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
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        <div>
          <button
            color="inherit"
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
