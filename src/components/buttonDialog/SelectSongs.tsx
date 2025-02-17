'use client'
import { TSong } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SearchBar } from '../searchBar'

export function SelectSongs({ song }: { song: TSong[] }) {
  const [search, setSearch] = useState('')
  const [songIds, setSongIds] = useState(song.map((s) => s.id))

  const { data: songs = [] } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      return await get<TSong[]>('song')
    },
  })

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

  const names =
    selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join(', ')

  return (
    <div>
      <label>
        <p className="dark:text-black">Músicas</p>
      </label>
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        header={
          <div>
            <SearchBar.ButtonInput
              title={`${names}`}
              className="w-full border-2 border-black"
            />
          </div>
        }
        body={
          <>
            <div className="mb-3 pl-2">
              {selectedNames.length !== 0 && <p>Músicas selecionadas:</p>}
              <span data-testid="names">{selectedNames.join(', ')}</span>
            </div>
            {filteredSong.length > 0 && (
              <>
                <SearchBar.Title title="Selecionar músicas" />
                {filteredSong.slice(0, 10).map((songs) => (
                  <div
                    key={songs.id}
                    onClick={() => handleSelectChange(songs.id)}
                  >
                    <SearchBar.SongItem
                      song={songs}
                      search={search}
                      album={songs.albums}
                    />
                  </div>
                ))}
              </>
            )}
          </>
        }
      />
    </div>
  )
}
