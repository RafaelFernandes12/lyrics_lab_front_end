'use client'

import { TSong } from '@/models'
import { del } from '@/services/axios'
import { CaretDownOutlined, DeleteFilled } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Props {
  isAlbumView: boolean
  songs: TSong[]
  onSuccess: () => void
}

export const SongsTable = ({ isAlbumView, songs, onSuccess }: Props) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  }>({ key: '', direction: 'asc' })

  const [loading, setLoading] = useState(false)

  const dataSource = songs.map((song) => ({
    key: song.id,
    name: song.name,
    tone: song.tone,
    album: song.albums
      .filter((album) => !album.isDefault)
      .map((album) => album.name)
      .join(', '),
    createdAt: new Date(song.createdAt),
  }))

  const sortedData = [...dataSource].sort((a, b) => {
    if (!sortConfig.key) return 0
    const isAsc = sortConfig.direction === 'asc'
    if (sortConfig.key === 'name') {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
    if (sortConfig.key === 'createdAt') {
      return isAsc
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime()
    }
    return 0
  })

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const onRemove = async (id: number) => {
    setLoading(true)

    if (!isAlbumView) {
      try {
        await del<TSong>('/song', id).then(() => {
          onSuccess()
        })
      } catch (error) {
        console.error('Error deleting songs:', error)
      } finally {
        setLoading(false)
      }
    } // else { remove from album }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4">
        <div
          onClick={() => handleSort('name')}
          className="flex-1 cursor-pointer"
        >
          Título <CaretDownOutlined />
        </div>
        <div className="flex-1">Álbum</div>
        <div
          onClick={() => handleSort('createdAt')}
          className="flex-1 cursor-pointer"
        >
          Adicionado <CaretDownOutlined />
        </div>
        <div className="w-24"></div>
      </div>

      {sortedData.map((item, index) => (
        <div
          key={item.key}
          className={`flex items-center justify-between p-4  text-white ${
            index % 2 === 0 ? 'bg-secundaria' : 'bg-gray-400'
          } mb-2 rounded-md`}
        >
          <div className="flex-1">{item.name}</div>
          <div className="flex-1">{item.album}</div>
          <div className="flex-1">{dayjs(item.createdAt).fromNow()}</div>
          <div className="w-24">
            <Button
              icon={
                <DeleteFilled style={{ fontSize: '20px', color: 'white' }} />
              }
              disabled={loading}
              onClick={() => onRemove(item.key)}
              style={{
                background: 'transparent',
                border: 'none',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
