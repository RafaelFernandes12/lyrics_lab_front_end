'use client'

import logo from '@/assets/logo.svg'
import { ConfirmModal } from '@/components/confirmModal'
import { SongsTable } from '@/components/songsTable'
import { TAlbum } from '@/models'
import { del, get } from '@/services/axios'
import { storage } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { message } from 'antd'
import { deleteObject, ref } from 'firebase/storage'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { AlbumForm } from './AlbumForm'

export const AlbumData = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

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

  async function handleDeleteAlbum() {
    try {
      const deletedAlbum = await del<TAlbum>(`/album`, parseInt(id))

      if (deletedAlbum && album?.image) {
        const decodedPath = decodeURIComponent(
          album.image.split('/o/')[1].split('?')[0],
        )
        await deleteObject(ref(storage, decodedPath))
      }

      router.push('/dashboard')
      router.refresh()
      message.success('Álbum removido com sucesso!')
    } catch (error) {
      message.error('Falha ao remover álbum. Tente novamente mais tarde.')
    }
  }

  if (isLoading) return <p>Carregando álbum...</p>
  if (!album) return <p>Erro ao carregar álbum</p>

  return (
    <>
      <section className="flex w-full gap-7 max-sm:flex-col max-sm:text-center">
        <Image
          src={album?.image || logo}
          alt="album-image"
          width={200}
          height={200}
          style={{ objectFit: album?.image ? 'cover' : 'contain' }}
          className={`h-52 w-52 rounded-xl bg-slate-200 ${album?.image ? 'object-cover' : 'object-contain'}`}
        />
        <div className="flex w-full flex-col items-start gap-4 p-2">
          <AlbumForm album={album} onSuccess={handleUpdate}>
            <h1>{album?.name}</h1>
          </AlbumForm>
          <span>{album?.songs.length} músicas</span>
          <p className="w-10/12">{album?.description}</p>
          <ConfirmModal
            title={'Tem certeza de que deseja excluir esse álbum?'}
            description={'Essa ação não pode ser desfeita.'}
            onConfirm={() => handleDeleteAlbum()}
          />
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
