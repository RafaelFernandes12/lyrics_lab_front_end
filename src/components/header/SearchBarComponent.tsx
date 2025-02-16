'use client'
<<<<<<< HEAD
import { TAlbum, TSong } from '@/models'
=======
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
>>>>>>> main
import Link from 'next/link'
import { useState } from 'react'
import { SearchBar } from '../searchBar'

interface searchBarProps {
<<<<<<< HEAD
  songs: TSong[]
  albums: TAlbum[]
=======
  songs: songProps[]
  albums: albumProps[]
>>>>>>> main
}

export function SearchBarComponent({ songs, albums }: searchBarProps) {
  const [search, setSearch] = useState('')

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
<<<<<<< HEAD
              {filteredSongs.slice(0, 4).map((song) => (
                <Link
                  href={`/song/${song.id}`}
                  key={song.id}
                  data-testid="songLink"
                >
=======
              {filteredSongs.slice(0, 4).map((song) =>
                <Link href={`/song/${song.id}`} key={song.id} data-testid='songLink'>
>>>>>>> main
                  <SearchBar.SongItem
                    album={song.albums}
                    song={song}
                    search={search}
                  />
                </Link>
<<<<<<< HEAD
              ))}
=======
              )}
>>>>>>> main
            </>
          )}

          {filteredAlbums.length > 0 && (
            <>
              <SearchBar.Title title="Álbuns" />
              {filteredAlbums.slice(0, 5).map((album) => (
<<<<<<< HEAD
                <Link
                  href={`/album/${album.id}`}
                  key={album.id}
                  data-testid="albumLink"
                >
=======
                <Link href={`/album/${album.id}`} key={album.id} data-testid='albumLink'>
>>>>>>> main
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
