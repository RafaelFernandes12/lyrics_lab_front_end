'use client'

import { TAlbum } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SearchBar } from '../searchBar'

export function SelectAlbums({ albums }: { albums: TAlbum[] }) {
  const [search, setSearch] = useState('')
  const [albumsIds, setAlbumsIds] = useState(albums.map((album) => album.id))

  const { data: albumList } = useQuery({
    queryKey: ['album'],
    queryFn: async () => {
      return await get<TAlbum[]>(`album`)
    },
  })

  const handleSelectChange = (albumId: number) => {
    setAlbumsIds((prev) => {
      if (prev.includes(albumId)) return prev.filter((id) => id !== albumId)
      else return [...prev, albumId]
    })
  }

  const selectedNames = albumsIds
    .map(
      (id) =>
        (albumList || []).find((data) => data.id === id && !data.isDefault)
          ?.name,
    )
    .filter((name) => name !== undefined) as string[]

  const filteredAlbums = (albumList || []).filter(
    (album) =>
      album.name.toLowerCase().includes(search.toLowerCase().trim()) &&
      !album.isDefault,
  )
  const names =
    selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join(', ')

  return (
    <div>
      <label>
        <p className="dark:text-black">Álbuns</p>
      </label>
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        header={
          <SearchBar.ButtonInput
            title={`${names}`}
            className="w-full border-2 border-black"
          />
        }
        body={
          <>
            <div className="mb-3 pl-2">
              {selectedNames.length !== 0 && <p>Álbuns selecionados:</p>}
              <span data-testid="names">{selectedNames.join(', ')}</span>
            </div>
            {filteredAlbums.length > 0 && (
              <>
                <SearchBar.Title title="Selecionar álbums" />
                {filteredAlbums.slice(0, 10).map((album) => (
                  <div
                    key={album.id}
                    onClick={() => handleSelectChange(album.id)}
                  >
                    <SearchBar.AlbumItem album={album} search={search} />
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
