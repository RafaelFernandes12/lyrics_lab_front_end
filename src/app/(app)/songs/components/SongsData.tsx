'use client'

import { SongsTable } from '@/components/songsTable/SongsTable'
import { TSong } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'

export const SongsData = () => {
  const { data: songs = [], refetch } = useQuery({
    queryKey: ['song'],
    queryFn: async () => {
      return await get<TSong[]>('song')
    },
  })

  const handleUpdate = () => {
    refetch()
  }

  return (
    <>
      {songs.length === 0 ? (
        <p className="text-gray-500">Você ainda não criou nenhuma música.</p>
      ) : (
        <SongsTable
          isAlbumView={false}
          songs={songs}
          onSuccess={handleUpdate}
        />
      )}
    </>
  )
}
