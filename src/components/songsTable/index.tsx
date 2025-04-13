'use client'

import { TSong } from '@/models'
import { del } from '@/services/axios'
import { CaretDownOutlined } from '@ant-design/icons'
import { message } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useState } from 'react'
import { DeleteModal } from '../deleteModal'

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
    album: isAlbumView
      ? []
      : song.albums
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

  const onDeleteSong = async (id: number) => {
    try {
      await del<TSong>('/song', id)
      onSuccess()
      message.success('Música excluida com sucesso!')
    } catch (error) {
      message.error('Erro ao excluir música.')
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between px-4">
          <div
            onClick={() => handleSort('name')}
            className="w-full cursor-pointer text-left"
          >
            Título <CaretDownOutlined />
          </div>
          {!isAlbumView && <div className="w-full text-center">Álbum</div>}
          <div
            onClick={() => handleSort('createdAt')}
            className={`${!isAlbumView ? 'mr-10' : ''} w-full cursor-pointer text-right`}
          >
            Criada <CaretDownOutlined />
          </div>
        </div>

        {sortedData.map((item, index) => (
          <div key={item.key} className="mb-2 flex w-full items-center gap-2">
            <Link
              href={`/song/${item.key}`}
              className={`flex w-full items-center p-4 text-white ${
                index % 2 === 0
                  ? 'bg-secundaria hover:bg-primariaHover'
                  : 'bg-gray-400 hover:bg-gray-500'
              } rounded-md`}
            >
              <div className="w-full text-left font-semibold">{item.name}</div>
              {!isAlbumView && (
                <div className="w-full text-center">{item.album}</div>
              )}
              <div className="w-full text-right">
                {dayjs(item.createdAt).fromNow()}
              </div>
            </Link>
            {!isAlbumView && (
              <div className="flex w-9 justify-center">
                <DeleteModal
                  title={'Tem certeza de que deseja excluir essa música?'}
                  description={'Essa ação não pode ser desfeita.'}
                  onConfirm={() => onDeleteSong(item.key)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
