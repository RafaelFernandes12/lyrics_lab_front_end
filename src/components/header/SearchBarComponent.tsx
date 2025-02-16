'use client'
import { TAlbum, TSong } from '@/models'
import Link from 'next/link'
import { useState } from 'react'
import { SearchBar } from '../searchBar'
import { getToken } from '@/services/getToken'
import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/axios'

export function SearchBarComponent() {
  const [search, setSearch] = useState('')

  const { data: songs = [] } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      const token = (await getToken()) || ''
      return await get<TSong[]>('song', token)
    },
  })
  const { data: albums = [] } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      const token = (await getToken()) || ''
      return await get<TAlbum[]>('album', token)
    },
  })
  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase().trim()),
  )
  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(search.toLowerCase().trim()),
  )
  return (
    <SearchBar.Root
      setSearch={(e) => setSearch(e.target.value)}
      header={
        <SearchBar.ButtonInput
          className="dark:text-white dark:placeholder:text-white"
          title="Pesquisar"
        />
      }
      body={
        <>
          {filteredSongs.length > 0 && (
            <>
              <SearchBar.Title title="Músicas" />
              {filteredSongs.slice(0, 4).map((song) => (
                <Link
                  href={`/song/${song.id}`}
                  key={song.id}
                  data-testid="songLink"
                >
                  <SearchBar.SongItem
                    album={song.albums}
                    song={song}
                    search={search}
                  />
                </Link>
              ))}
            </>
          )}

          {filteredAlbums.length > 0 && (
            <>
              <SearchBar.Title title="Álbuns" />
              {filteredAlbums.slice(0, 5).map((album) => (
                <Link
                  href={`/album/${album.id}`}
                  key={album.id}
                  data-testid="albumLink"
                >
                  <SearchBar.AlbumItem album={album} search={search} />
                </Link>
              ))}
            </>
          )}
        </>
      }
    />
  )
}
