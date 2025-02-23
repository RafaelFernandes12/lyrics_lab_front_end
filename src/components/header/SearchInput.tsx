'use client'

import { TAlbum, TSong } from '@/models'
import { get } from '@/services/axios'
import { FileSearchOutlined } from '@ant-design/icons'
import { useQueries } from '@tanstack/react-query'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { SearchBar } from '../searchBar'
import { MediaItem, Title } from '../searchBar/ListItems'

export function SearchInput() {
  const [search, setSearch] = useState('')

  const results = useQueries({
    queries: [
      { queryKey: ['song'], queryFn: () => get<TSong[]>('song') },
      { queryKey: ['album'], queryFn: () => get<TAlbum[]>('album') },
    ],
  })

  const songs = useMemo(() => results[0].data || [], [results])
  const albums = useMemo(() => results[1].data || [], [results])

  const filteredSongs = useMemo(
    () =>
      songs.filter((song) =>
        song.name.toLowerCase().includes(search.toLowerCase().trim()),
      ),
    [songs, search],
  )

  const filteredAlbums = useMemo(
    () =>
      albums.filter((album) =>
        album.name.toLowerCase().includes(search.toLowerCase().trim()),
      ),
    [albums, search],
  )

  return (
    <SearchBar.Root
      setSearch={(e) => setSearch(e.target.value)}
      searchValue={search}
      header={
        <SearchBar.ButtonInput
          className="max-w-36 dark:text-white dark:placeholder:text-white"
          title="Pesquisar"
        />
      }
      body={
        <>
          {filteredSongs.length > 0 && (
            <>
              <Title title="Músicas" />
              {filteredSongs.slice(0, 5).map((song) => (
                <Link
                  href={`/song/${song.id}`}
                  key={song.id}
                  data-testid="songLink"
                >
                  <MediaItem
                    item={song}
                    search={search}
                    icon={
                      <FileSearchOutlined className="mr-2 dark:text-white" />
                    }
                  />
                </Link>
              ))}
            </>
          )}
          {filteredAlbums.length > 0 && (
            <>
              <Title title="Álbuns" />
              {filteredAlbums.slice(0, 5).map((album) => (
                <Link
                  href={`/album/${album.id}`}
                  key={album.id}
                  data-testid="albumLink"
                >
                  <MediaItem
                    item={album}
                    search={search}
                    icon={
                      <FileSearchOutlined className="mr-2 dark:text-white" />
                    }
                  />
                </Link>
              ))}
            </>
          )}
        </>
      }
    />
  )
}
