<<<<<<< HEAD
'use client'

import UploadImage from '@/components/albumCard/UploadImage'
import { ErrorHandler } from '@/helpers/ErrorHandler'
import { storage } from '@/lib/firebase'
import { idProps, TAlbum, TSong, TUser } from '@/models'
import { get, put } from '@/services/axios'
import { fetcher } from '@/services/fetcher'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImage'
import { MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
=======
"use client";

import UploadImage from "@/components/albumCard/UploadImage";
import { AuthContext } from "@/contexts/AuthContext";
import { ErrorHandler } from "@/helpers/ErrorHandler";
import { fetcher } from "@/lib/fetcher";
import { storage } from "@/lib/firebase";
import { albumProps } from "@/models/albumProps";
import { idProps } from "@/models/idProps";
import { clientEditAlbum } from "@/operations/albums/client-side/editAlbum";
import EditIcon from "@mui/icons-material/Edit";
import HideImageIcon from "@mui/icons-material/HideImage";
import { MenuItem } from "@mui/material";
>>>>>>> main
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
<<<<<<< HEAD
} from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ButtonDialog } from '../buttonDialog/index'

export function EditMenuItem({ id, color }: idProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [songs, setSongs] = useState<TSong[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = (await getCookie('jwt')) || ''
      const response = await get<{ user: TUser }>('/auth/user', token)
      return response.user
    },
  })

  const { data: album } = useSWR<TAlbum>(`/album/${id}`, fetcher)
  useEffect(() => {
    if (album) {
      setName(album.name)
      setDescription(album.description)
      setImage(album.image)
      setSongs(album?.songs || [])
    }
  }, [album])
=======
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { ButtonDialog } from "../buttonDialog/index";
import { songProps } from "@/models/songProps";

export function EditMenuItem({ id, color }: idProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [songs, setSongs] = useState<songProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { data: album } = useSWR<albumProps>(`/album/${id}`, fetcher);

  useEffect(() => {
    if (album) {
      setName(album.name);
      setDescription(album.description);
      setImage(album.image);
      setSongs(album?.songs || []);
    }
  }, [album]);
>>>>>>> main

  const handleEditAlbum = async () => {
    if (!file) {
      if (!name.trim()) {
<<<<<<< HEAD
        setError(true)
        return
      }

      const token = (await getCookie('jwt')) || ''
      await put<TAlbum>(
        `album/${id}`,
        { id, name, description, image, songs },
        token,
      ).then(() => {
        setError(false)
        router.refresh()
      })
      return
    }

    setUploading(true)

    const storageRef = ref(storage, `users/${user?.id}/${album?.id}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
=======
        setError(true);
        return;
      }

      clientEditAlbum({ id, name, description, image, songs }).then(() => {
        setError(false);
        router.refresh();
      });
      return;
    }

    setUploading(true);

    const storageRef = ref(storage, `users/${user?.id}/${album?.id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
>>>>>>> main
      },
      (error) => {
        ErrorHandler(
          error,
<<<<<<< HEAD
          'Falha no carregamento da imagem. Tente novamente mais tarde.',
        )
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        const token = (await getCookie('jwt')) || ''
        await put<TAlbum>(
          `album/${id}`,
          { id, name, description, image: url },
          token,
        ).then(() => {
          setUploading(false)
          setError(false)
          router.refresh()
        })
      },
    )
  }

  const handleDeleteAlbumImage = async () => {
    try {
      if (!album?.image) return

      const decodedPath = decodeURIComponent(
        album.image.split('/o/')[1].split('?')[0],
      )

      const imageRef = ref(storage, decodedPath)

      await deleteObject(imageRef)

      const token = (await getCookie('jwt')) || ''
      await put<TAlbum>(
        `album/${id}`,
        { id, name, description, image: '', songs },
        token,
      ).then(() => {
        setUploading(false)
        setError(false)
        router.refresh()
      })

      album.image = ''
    } catch (error) {
      ErrorHandler(
        error,
        'Falha ao remover imagem. Tente novamente mais tarde.',
      )
    }
  }
=======
          "Falha no carregamento da imagem. Tente novamente mais tarde.",
        );
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        clientEditAlbum({ id, name, description, image: url }).then(() => {
          setUploading(false);
          setError(false);
          router.refresh();
        });
      },
    );
  };

  const handleDeleteAlbumImage = async () => {
    try {
      if (!album?.image) return;

      const decodedPath = decodeURIComponent(
        album.image.split("/o/")[1].split("?")[0],
      );

      const imageRef = ref(storage, decodedPath);

      await deleteObject(imageRef);

      await clientEditAlbum({ id, name, description, image: "", songs }).then(
        () => {
          setUploading(false);
          setError(false);
          router.refresh();
        },
      );

      album.image = "";
    } catch (error) {
      ErrorHandler(
        error,
        "Falha ao remover imagem. Tente novamente mais tarde.",
      );
    }
  };
>>>>>>> main

  return (
    <ButtonDialog.Root
      action={handleEditAlbum}
      text="Editar Álbum"
      uploading={uploading}
      header={
        <MenuItem
          className={
            color
              ? `flex items-center gap-3 ${color}`
<<<<<<< HEAD
              : 'flex items-center gap-3'
=======
              : "flex items-center gap-3"
>>>>>>> main
          }
        >
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
            value={description}
            placeholder="Descrição"
            state={(e) => setDescription(e.target.value)}
          />
          <ButtonDialog.SelectSongs song={songs} />
          <div className="flex flex-col gap-2">
            <UploadImage onFileSelect={(file) => setFile(file)} />
            {album?.image !== null && (
              <div>
                <button
                  onClick={handleDeleteAlbumImage}
                  className="flex items-center gap-2 rounded bg-redButton p-2 text-white"
                >
                  <HideImageIcon />
                  Remover imagem
                </button>
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-500">O nome não pode estar vazio!</p>
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
