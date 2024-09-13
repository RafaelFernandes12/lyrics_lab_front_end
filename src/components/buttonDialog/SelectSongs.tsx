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

  const names =
    selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join(', ')

  return (
    <div>
      <label>
        <p className="dark:text-black">Músicas</p>
      </label>
      <SearchBar.ButtonInput
        handleClick={handleClick}
        title={`${names}`}
        className="w-full border-2 border-black"
      />
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        style={{ display: open ? 'block' : 'none' }}
        handleClick={handleClick}
        searchRef={searchRef}
      >
        <div className="mb-3 pl-2">
          {selectedNames.length !== 0 && <p>Músicas selecionadas:</p>}
          <span>{selectedNames.join(', ')}</span>
        </div>
        {filteredSong.length > 0 && (
          <>
            <SearchBar.Title title="Selecionar músicas" />
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
