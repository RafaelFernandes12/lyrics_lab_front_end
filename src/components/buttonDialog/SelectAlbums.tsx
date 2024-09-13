'use client'
import { fetcher } from '@/lib/fetcher'
import { albumProps } from '@/models/albumProps'
import { SetStateAction, useState } from 'react'
import useSWR from 'swr'
import { SearchBar } from '../searchBar'
import { useHandleClick } from '../searchBar/useHandleClick'

interface searchBarProps {
  albumsIds: number[]
  setAlbumsIds: (value: SetStateAction<number[]>) => void
}

export function SelectAlbums({ albumsIds, setAlbumsIds }: searchBarProps) {
  const [search, setSearch] = useState('')

  let { data: album } = useSWR<albumProps[]>('/album', fetcher)

  if (!album) album = []

  const handleSelectChange = (albumId: number) => {
    setAlbumsIds((prev) => {
      if (prev.includes(albumId)) {
        return prev.filter((id) => id !== albumId)
      } else {
        return [...prev, albumId]
      }
    })
  }

  const selectedNames = albumsIds
    .map((id) => album.find((data) => data.id === id && !data.isDefault)?.name)
    .filter((name) => name !== undefined) as string[]

  const filteredAlbums = album.filter(
    (album) =>
      album.name.toLowerCase().includes(search.toLowerCase().trim()) &&
      !album.isDefault,
  )
  const { handleClick, open, searchRef } = useHandleClick()

  const names =
    selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join(', ')

  return (
    <div>
      <label>
        <p className="dark:text-black">Álbuns</p>
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
          {selectedNames.length !== 0 && <p>Álbuns selecionados:</p>}
          <span>{selectedNames.join(', ')}</span>
        </div>
        {filteredAlbums.length > 0 && (
          <>
            <SearchBar.Title title="Selecionar álbums" />
            {filteredAlbums.slice(0, 10).map((album) => (
              <div key={album.id} onClick={() => handleSelectChange(album.id)}>
                <SearchBar.AlbumItem album={album} search={search} />
              </div>
            ))}
          </>
        )}
      </SearchBar.Root>
    </div>
  )
}
