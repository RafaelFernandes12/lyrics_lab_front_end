'use client'

import { TSong } from '@/models'
import { del } from '@/services/axios'
import { CaretDownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'
import { ConfirmModal } from '../confirmModal'

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
    if (!isAlbumView) {
      try {
        await del<TSong>('/song', id).then(() => {
          onSuccess()
        })
      } catch (error) {
        console.error('Error deleting songs:', error)
      }
    } // else { remove from album }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full dark:text-white">
        <div className="flex items-center justify-between p-4">
          <div
            onClick={() => handleSort('name')}
            className="flex-1 cursor-pointer text-left"
          >
            Título <CaretDownOutlined />
          </div>
          <div className="flex-1 text-left">Álbum</div>
          <div
            onClick={() => handleSort('createdAt')}
            className="flex-1 cursor-pointer text-left"
          >
            Adicionado <CaretDownOutlined />
          </div>
          <div className="w-10"></div>
        </div>

        {sortedData.map((item, index) => (
          <div key={item.key} className="mb-2 flex w-full items-center gap-2">
            <div
              className={`flex flex-1 items-center p-4 text-white ${
                index % 2 === 0 ? 'bg-secundaria' : 'bg-gray-400'
              } rounded-md`}
            >
              <div className="flex-1 text-left">{item.name}</div>
              <div className="flex-1 text-left">{item.album}</div>
              <div className="flex-1 text-left">
                {dayjs(item.createdAt).fromNow()}
              </div>
            </div>
            <div className="flex w-8 justify-center">
              <ConfirmModal
                title={'Tem certeza de que deseja excluir essa música?'}
                description={'Essa ação não pode ser desfeita.'}
                onConfirm={() => onRemove(item.key)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
