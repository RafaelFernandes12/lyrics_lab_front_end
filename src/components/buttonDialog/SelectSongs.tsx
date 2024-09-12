'use client'
import { fetcher } from '@/lib/fetcher'
import { songProps } from '@/models/songProps'
import { SetStateAction, useState } from 'react'
import useSWR from 'swr'
import { SearchBar } from '../searchBar'
import { useHandleClick } from '../searchBar/useHandleClick'

interface searchBarProps {
  songIds: number[]
  setSongIds: (value: SetStateAction<number[]>) => void
}

export function SelectSongs({ songIds, setSongIds }: searchBarProps) {
  const [search, setSearch] = useState('')

  let { data: songs } = useSWR<songProps[]>('/song', fetcher)
  if (!songs) songs = []

  const handleSelectChange = (songsId: number) => {
    setSongIds((prev) => {
      if (prev.includes(songsId)) {
        return prev.filter((id) => id !== songsId)
      } else {
        return [...prev, songsId]
      }
    })
  }

  const selectedNames = songIds
    .map((id) => songs.find((data) => data.id === id)?.name)
    .filter((name) => name !== undefined) as string[]

  const filteredSong = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase().trim()),
  )
  const { handleClick, open, searchRef } = useHandleClick()

  const names = selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join()

  return (
    <div>
      <SearchBar.ButtonInput
        handleClick={handleClick}
        title={`${names}`}
        className="w-full border-2 border-black dark:bg-gray-600"
      />
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        style={{ display: open ? 'block' : 'none' }}
        handleClick={handleClick}
        searchRef={searchRef}
      >
        <div className="pl-2">
          <span>{selectedNames.join()}</span>
        </div>
        {filteredSong.length > 0 && (
          <>
            <SearchBar.Title title="song" />
            {filteredSong.slice(0, 10).map((songs) => (
              <div key={songs.id} onClick={() => handleSelectChange(songs.id)}>
                <SearchBar.SongItem song={songs} search={search} />
              </div>
            ))}
          </>
        )}
      </SearchBar.Root>
    </div>
  )
}
