<<<<<<< HEAD
'use client'

import { idProps, TSong } from '@/models'
import { del } from '@/services/axios'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItem } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { ButtonDialog } from '../buttonDialog'

export function DeleteMenuItem({ id }: idProps) {
  const router = useRouter()

  async function handleDeleteSong() {
    const token = (await getCookie('jwt')) || ''
    await del<TSong>(`/song`, id, token).then(() => router.refresh())
=======
"use client";

import { idProps } from "@/models/idProps";
import { clientDeleteSong } from "@/operations/songs/client-side/delete";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { ButtonDialog } from "../buttonDialog";

export function DeleteMenuItem({ id }: idProps) {

  const router = useRouter();

  function handleDeleteSong() {
    clientDeleteSong(id).then(() => router.refresh());
>>>>>>> main
  }
  return (
    <ButtonDialog.Root
      action={handleDeleteSong}
      text="Excluir Música"
      header={
        <MenuItem className="flex items-center gap-3">
          <DeleteIcon
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
          Excluir
        </MenuItem>
      }
      body={
        <p className="dark:text-black">
          Tem certeza que deseja excluir a música? Esta ação não pode ser
<<<<<<< HEAD
          desfeita{' '}
        </p>
      }
    />
  )
=======
          desfeita{" "}
        </p>
      }
    />
  );
>>>>>>> main
}
