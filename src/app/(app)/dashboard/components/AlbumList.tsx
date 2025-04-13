'use client'

import { AlbumCard } from '@/components/albumCard'
import { TAlbum } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

export function AlbumList() {
  const { data: albums = [], isLoading } = useQuery({
    queryKey: ['album'],
    queryFn: async () => {
      const data = await get<TAlbum[]>('album')
      return data.filter((album: TAlbum) => !album.isDefault)
    },
    refetchOnMount: true,
  })

  return (
    <div>
      {albums.length === 0 || isLoading ? (
        <p className="text-gray-500">Você ainda não criou nenhum álbum.</p>
      ) : (
        <div className="grid w-full grid-cols-5 gap-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          {albums.slice(0, 5).map((album) => {
            if (album.isDefault) return null
            return (
              <AlbumCard
                id={album.id}
                key={album.id}
                name={album.name}
                image={album.image}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
