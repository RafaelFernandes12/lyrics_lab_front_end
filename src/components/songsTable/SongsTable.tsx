'use client'

import { TSong } from '@/models'
import { del } from '@/services/axios'
import type { TableColumnsType, TableProps } from 'antd'
import { Button, Flex, Table } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection']

interface DataType {
  key: React.Key
  name: string
  tone: string
  album: string
  createdAt: string
}

interface Props {
  isAlbumView: boolean
  songs: TSong[]
  onSuccess: () => void
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Título',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  { title: 'Álbum', dataIndex: 'album' },
  { title: 'Tom', dataIndex: 'tone' },
  {
    title: 'Adicionado',
    dataIndex: 'createdAt',
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
]

const onChangeSort: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

export const SongsTable = ({ isAlbumView, songs, onSuccess }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  const dataSource = songs.map((song) => ({
    key: song.id,
    name: song.name,
    tone: song.tone,
    album: song.albums
      .filter((album) => !album.isDefault)
      .map((album) => album.name)
      .join(', '),
    createdAt: dayjs().to(song.createdAt),
  }))

  const onRemove = () => {
    setLoading(true)
    const newSelectedRowKeys: React.Key[] = selectedRowKeys

    if (!isAlbumView) {
      newSelectedRowKeys.forEach(async (songId) => {
        try {
          await del<TSong>('/song', Number(songId)).then(() => {
            onSuccess()
            setSelectedRowKeys([])
            setLoading(false)
          })
        } catch (error) {
          console.error(`Error deleting song with ID ${songId}:`, error)
        }
      })
    } // else { remove from album }
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button
          type="primary"
          onClick={onRemove}
          disabled={!hasSelected}
          loading={loading}
        >
          {isAlbumView ? 'Remover do álbum' : 'Excluir'}
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>

      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        onChange={onChangeSort}
        showSorterTooltip={false}
      />
    </Flex>
  )
}
