'use client'

import logo from '@/assets/logo.svg'
import { SongsTable } from '@/components/songsTable/SongsTable'
import { TAlbum } from '@/models'
import { get } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { AlbumForm } from './AlbumForm'

export const AlbumData = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: album,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['album', id],
    queryFn: async () => {
      return await get<TAlbum>(`album/${id}`)
    },
  })

  const handleUpdate = () => {
    refetch()
  }

  if (isLoading) return <p>Carregando álbum...</p>
  if (!album) return <p>Erro ao carregar álbum</p>

  return (
    <>
      <section className="flex w-full gap-7 max-sm:flex-col max-sm:text-center">
        <Image
          src={album?.image || logo}
          alt="example"
          width={208}
          height={208}
          style={{ objectFit: album?.image ? 'cover' : 'contain' }}
          className={`h-52 w-52 rounded-xl bg-slate-200 ${album?.image ? 'object-cover' : 'object-contain'}`}
        />
        <div className="flex w-full flex-col items-start justify-normal gap-4 py-4">
          <AlbumForm album={album} onSuccess={handleUpdate}>
            <h1>{album?.name}</h1>
          </AlbumForm>
          <span>{album?.songs.length} músicas</span>
          <p className="w-10/12">{album?.description}</p>
        </div>
      </section>
      {album?.songs?.length !== 0 && (
        <SongsTable
          isAlbumView={true}
          songs={album.songs}
          onSuccess={handleUpdate}
        />
      )}
    </>
  )
}
