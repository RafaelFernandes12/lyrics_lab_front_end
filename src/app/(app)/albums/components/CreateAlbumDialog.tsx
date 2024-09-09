'use client'
import { ButtonDialogSelect } from '@/components/buttonDialog/ButtonDialogSelect';
import { ButtonDialog } from '@/components/buttonDialog/index';
import { fetcher } from '@/lib/fetcher';
import { songProps } from '@/models/songProps';
import { clientCreateAlbum } from '@/operations/albums/client-side/post';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export function CreateAlbumDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const [songIds, setSongIds] = useState<number[]>([])
    // const [albumIds, setAlbumIds] = useState<number[]>([])
  function handleCreateAlbum() {
    clientCreateAlbum({ name, description }).then(() => {
      router.refresh()
    })
  }

  return (
    <ButtonDialog.Root text="Adicionar Álbum" action={handleCreateAlbum}>
      <ButtonDialog.Input
        placeholder="Nome"
        state={(e) => setName(e.target.value)}
      />
      <ButtonDialog.Input
        placeholder="Descrição"
        state={(e) => setDescription(e.target.value)}
      />
      {/* <ButtonDialogSelect
        url='song'
        title='Músicas'
        dataIds={songIds}
        setDataIds={(value) => setSongIds(value)}
      /> */}
    </ButtonDialog.Root>
  )
}
