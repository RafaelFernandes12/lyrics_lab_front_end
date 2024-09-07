'use client'
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import SearchIcon from '@mui/icons-material/Search'
import { Divider, InputAdornment } from '@mui/material'
import Input from '@mui/material/Input'
import Link from 'next/link'
import { useState } from 'react'

interface searchBarProps {
  songs: songProps[]
  albums: albumProps[]
}
export function SearchBar({ songs, albums }: searchBarProps) {
  const [search, setSearch] = useState('')

  const clearSearch = () => setSearch('')

  return (
    <div className="relative w-full">
      <Input
        placeholder="Pesquisar"
        className="dark:text-white"
        onChange={(e) => setSearch(e.target.value)}
        disableUnderline
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon className="dark:text-white" />
          </InputAdornment>
        }
      />
      <ul
        className="absolute z-10 mt-2 max-h-72 w-full overflow-y-auto rounded-lg bg-white dark:bg-black"
        style={{ display: search === '' ? 'none' : 'block' }}
      >
        <li>
          <span className="p-2 text-sm font-semibold text-gray-700">
            Músicas
          </span>
        </li>
        {songs.map((song, i) => {
          if (song.name.includes(search.toLowerCase())) {
            return (
              <Link href={`/song/${song.id}`} key={i} onClick={clearSearch}>
                <li className="flex w-full items-center justify-between truncate p-2 hover:bg-slate-200 dark:hover:bg-slate-900">
                  <span className="p-2">{song.name}</span>
                  {song.albums.map((album) => (
                    <span key={album.id} className="text-xs">
                      {album.name}
                    </span>
                  ))}
                </li>
              </Link>
            )
          }
          return ''
        })}
        <Divider className="my-1" />
        <li>
          <span className="p-2 text-sm font-semibold text-gray-700">
            Álbuns
          </span>
        </li>
        {albums.map((album, i) => {
          if (album.name.includes(search)) {
            return (
              <Link href={`/album/${album.id}`} key={i} onClick={clearSearch}>
                <li className="truncate p-2 hover:bg-slate-200 dark:hover:bg-slate-900">
                  <span className="p-2">{album.name}</span>
                </li>
              </Link>
            )
          }
          return ''
        })}
      </ul>
    </div>
  )
}
