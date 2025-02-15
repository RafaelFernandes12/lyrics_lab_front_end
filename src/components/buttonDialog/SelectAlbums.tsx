<<<<<<< HEAD
'use client'
import { TAlbum } from '@/models'
import { fetcher } from '@/services/fetcher'
import { useState } from 'react'
import useSWR from 'swr'
import { SearchBar } from '../searchBar'

export function SelectAlbums({ albums }: { albums: TAlbum[] }) {
  const [search, setSearch] = useState('')
  const [albumsIds, setAlbumsIds] = useState(albums.map((album) => album.id))

  const { data: album } = useSWR<TAlbum[]>('/album', fetcher)

  const handleSelectChange = (albumId: number) => {
    setAlbumsIds((prev) => {
      if (prev.includes(albumId)) return prev.filter((id) => id !== albumId)
      else return [...prev, albumId]
    })
  }
=======
"use client";
import { fetcher } from "@/lib/fetcher";
import { albumProps } from "@/models/albumProps";
import { useState } from "react";
import useSWR from "swr";
import { SearchBar } from "../searchBar";

export function SelectAlbums({ albums }: { albums: albumProps[] }) {
  const [search, setSearch] = useState("");
  const [albumsIds, setAlbumsIds] = useState(albums.map((album) => album.id));

  const { data: album } = useSWR<albumProps[]>("/album", fetcher);

  const handleSelectChange = (albumId: number) => {
    setAlbumsIds((prev) => {
      if (prev.includes(albumId)) return prev.filter((id) => id !== albumId);
      else return [...prev, albumId];
    });
  };
>>>>>>> main

  const selectedNames = albumsIds
    .map(
      (id) =>
        (album || []).find((data) => data.id === id && !data.isDefault)?.name,
    )
<<<<<<< HEAD
    .filter((name) => name !== undefined) as string[]
=======
    .filter((name) => name !== undefined) as string[];
>>>>>>> main

  const filteredAlbums = (album || []).filter(
    (album) =>
      album.name.toLowerCase().includes(search.toLowerCase().trim()) &&
      !album.isDefault,
<<<<<<< HEAD
  )
  const names =
    selectedNames.length === 0 ? 'Pesquisar' : selectedNames.join(', ')
=======
  );
  const names =
    selectedNames.length === 0 ? "Pesquisar" : selectedNames.join(", ");
>>>>>>> main

  return (
    <div>
      <label>
        <p className="dark:text-black">Álbuns</p>
      </label>
      <SearchBar.Root
        setSearch={(e) => setSearch(e.target.value)}
        header={
          <SearchBar.ButtonInput
            title={`${names}`}
            className="w-full border-2 border-black"
          />
        }
        body={
          <>
            <div className="mb-3 pl-2">
              {selectedNames.length !== 0 && <p>Álbuns selecionados:</p>}
<<<<<<< HEAD
              <span data-testid="names">{selectedNames.join(', ')}</span>
=======
              <span data-testid='names'>{selectedNames.join(", ")}</span>
>>>>>>> main
            </div>
            {filteredAlbums.length > 0 && (
              <>
                <SearchBar.Title title="Selecionar álbums" />
                {filteredAlbums.slice(0, 10).map((album) => (
                  <div
                    key={album.id}
                    onClick={() => handleSelectChange(album.id)}
                  >
                    <SearchBar.AlbumItem album={album} search={search} />
                  </div>
                ))}
              </>
            )}
          </>
        }
      />
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> main
}
