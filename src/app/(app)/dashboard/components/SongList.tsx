'use client'

import { SongCard } from '@/components/songCard/Index'
import { ThreeDots } from '@/components/ThreeDots'
import { TSong } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

export function SongList() {
  const { data: songs = [] } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      return await get<TSong[]>('song')
    },
  })
  return (
    <div>
      {songs.length === 0 ? (
        <p className="text-gray-500">Você ainda não criou nenhuma música.</p>
      ) : (
        <div className="grid w-full grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {songs.slice(0, 8).map((song) => {
            return (
              <SongCard.Root key={song.id}>
                <div className="flex items-center gap-4">
                  <ThreeDots>
                    <SongCard.EditMenuItem id={song.id} />
                    <SongCard.DeleteMenuItem id={song.id} />
                  </ThreeDots>
                  <div className="flex flex-col">
                    <SongCard.Name song={song} />
                    <p>
                      <span className="text-white">Tom: </span>
                      <SongCard.Tone song={song} />
                    </p>
                  </div>
                </div>
              </SongCard.Root>
            )
          })}
        </div>
      )}
    </div>
  )
}
