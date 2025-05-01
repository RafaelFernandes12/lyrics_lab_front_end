'use client'
import { MenuOutlined } from '@ant-design/icons'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { Drawer, Button } from 'antd'
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import Link from 'next/link'
import { useState } from 'react'
import { SearchInput } from './SearchInput'

export function Menu() {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        className="md:hidden"
      />

      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
        width={250}
      >
        <div className="flex flex-col justify-center">
          <Link href="/songs" onClick={onClose}>
            <p className="flex cursor-pointer gap-2 rounded p-2 hover:bg-gray-200">
              <AudioFileOutlinedIcon />
              Músicas
            </p>
          </Link>
          <Link href="/albums" onClick={onClose}>
            <p className="flex cursor-pointer gap-2 rounded p-2 hover:bg-gray-200">
              <QueueMusicIcon />
              Álbuns
            </p>
          </Link>
          <Link href="/user" onClick={onClose}>
            <p className="flex cursor-pointer gap-2 rounded p-2 hover:bg-gray-200">
              <PersonOutlinedIcon />
              Perfil
            </p>
          </Link>
          <div className="mt-4 cursor-pointer gap-2 rounded p-2 hover:bg-gray-200">
            <SearchInput onClose={onClose} />
          </div>
        </div>
      </Drawer>
    </>
  )
}
