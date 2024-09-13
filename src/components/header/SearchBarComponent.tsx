'use client'
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import Link from 'next/link'
import { useState } from 'react'
import { SearchBar } from '../searchBar'
import { useHandleClick } from '../searchBar/useHandleClick'
interface searchBarProps {
  songs: songProps[]
  albums: albumProps[]
}

export function SearchBarComponent({ songs, albums }: searchBarProps) {
  const [search, setSearch] = useState('')
  const { handleClick, open, searchRef } = useHandleClick()

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase().trim()),
  )
  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(search.toLowerCase().trim()),
  )

  return (
    <div>
      <SearchBar.ButtonInput
        className="bg-transparent dark:text-white dark:placeholder:text-white"
        handleClick={handleClick}
        title="Pesquisar"
      />
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        style={{ display: open ? 'block' : 'none' }}
        handleClick={handleClick}
        searchRef={searchRef}
      >
        {filteredSongs.length > 0 && (
          <>
            <SearchBar.Title title="Músicas" />
            {filteredSongs.slice(0, 4).map((song, i) =>
              song.albums.map((album) => (
                <Link href={`/song/${song.id}`} key={album.id + song.id + i}>
                  <SearchBar.SongItem
                    album={album}
                    song={song}
                    search={search}
                  />
                </Link>
              )),
            )}
          </>
        )}

        {filteredAlbums.length > 0 && (
          <>
            <SearchBar.Title title="Álbuns" />
            {filteredAlbums.slice(0, 5).map((album) => (
              <Link href={`/album/${album.id}`} key={album.id}>
                <SearchBar.AlbumItem album={album} search={search} />
              </Link>
            ))}
          </>
        )}
      </SearchBar.Root>
    </div>
  )
}
