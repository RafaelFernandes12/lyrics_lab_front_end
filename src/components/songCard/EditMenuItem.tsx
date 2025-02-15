<<<<<<< HEAD
'use client'

import { SuccessHandler } from '@/helpers/SuccessHandler'
import { idProps, TAlbum, TSong } from '@/models'
import { put } from '@/services/axios'
import { fetcher } from '@/services/fetcher'
import EditIcon from '@mui/icons-material/Edit'
import { MenuItem } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid'
import { ButtonDialog } from '../buttonDialog/index'

export function EditMenuItem({ id }: idProps) {
  const [name, setName] = useState('')
  const [tone, setTone] = useState('')
  const [albums, setAlbums] = useState<TAlbum[]>([])
  const [error, setError] = useState(false)

  const router = useRouter()

  const { data: song } = useSWR<TSong>(`/song/${id}`, fetcher)

  useEffect(() => {
    if (song) {
      setName(song.name)
      setTone(song.tone)
      setAlbums(song?.albums || [])
    }
  }, [song])

  async function handleEditSong() {
    if (!name.trim()) {
      setError(true)
      return
    }
    const token = (await getCookie('jwt')) || ''
    await put<TSong>(`/song/${id}`, { name, tone, albums }, token).then(() => {
      SuccessHandler({ id: uuidv4(), message: 'Música editada com sucesso' })
      setError(false)
      router.refresh()
    })
=======
"use client";
import { SuccessHandler } from "@/helpers/SuccessHandler";
import { fetcher } from "@/lib/fetcher";
import { idProps } from "@/models/idProps";
import { songProps } from "@/models/songProps";
import { clientEditSong } from "@/operations/songs/client-side/editSong";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { ButtonDialog } from "../buttonDialog/index";
import { albumProps } from "@/models/albumProps";

export function EditMenuItem({ id }: idProps) {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("");
  const [albums, setAlbums] = useState<albumProps[]>([]);
  const [error, setError] = useState(false);

  const router = useRouter();

  const { data: song } = useSWR<songProps>(`/song/${id}`, fetcher);

  useEffect(() => {
    if (song) {
      setName(song.name);
      setTone(song.tone);
      setAlbums(song?.albums || []);
    }
  }, [song]);

  function handleEditSong() {
    if (!name.trim()) {
      setError(true);
      return;
    }
    clientEditSong({ id, name, tone, albums }).then(() => {
      SuccessHandler({ id: uuidv4(), message: "Música editada com sucesso" });
      setError(false);
      router.refresh();
    });
>>>>>>> main
  }

  return (
    <ButtonDialog.Root
      action={handleEditSong}
      text="Editar Música"
      header={
        <MenuItem className="flex items-center gap-3" data-testid="menuItem">
          <EditIcon
            sx={{
<<<<<<< HEAD
              height: '18px',
              width: '18px',
=======
              height: "18px",
              width: "18px",
>>>>>>> main
            }}
          />
          Editar
        </MenuItem>
      }
      body={
        <>
          <ButtonDialog.Input
            value={name}
            placeholder="Nome"
            state={(e) => setName(e.target.value)}
          />
          <ButtonDialog.Input
            value={tone}
            placeholder="Tom"
            state={(e) => setTone(e.target.value)}
          />
<<<<<<< HEAD
          <ButtonDialog.SelectAlbums albums={song?.albums || []} />
=======
          <ButtonDialog.SelectAlbums
            albums={song?.albums || []}
          />
>>>>>>> main
          {error && (
            <p className="text-red-500 dark:text-red-500">
              O nome não pode estar vazio!
            </p>
          )}
        </>
      }
    />
<<<<<<< HEAD
  )
=======
  );
>>>>>>> main
}
