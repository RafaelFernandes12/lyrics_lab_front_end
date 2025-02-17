'use client'

import { AlbumCard } from '@/components/albumCard/AlbumCard'
import { TAlbum } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

export function AlbumList() {
  const { data: albums = [] } = useQuery({
    queryKey: ['album'],
    queryFn: async () => {
      const data = await get<TAlbum[]>('album')
      return data.filter((album: TAlbum) => !album.isDefault)
    },
  })

  return (
    <div>
      {albums.length === 0 ? (
        <p className="text-gray-500">Você ainda não criou nenhum álbum.</p>
      ) : (
        <ul className="grid grid-cols-5 items-center gap-8 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          {albums.map((album) => {
            const songsNames = album.songs.flatMap((song) => {
              return song.name
            })
            return (
              <li key={album.id}>
                <AlbumCard
                  id={album.id}
                  name={album.name}
                  image={album.image}
                  songs={songsNames}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
