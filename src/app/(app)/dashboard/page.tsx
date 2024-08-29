import { AlbumCard } from '@/components/albumCard/AlbumCard'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import { serverGetAllAlbums } from '@/operations/albums/server-side/getAll'
import { serverGetAllSongs } from '@/operations/songs/server-side/getAll'
import Link from 'next/link'

export default async function Home() {
  const albums: albumProps[] = (await serverGetAllAlbums()) || []
  const songs: songProps[] = (await serverGetAllSongs()) || []

  return (
    <>
      <main>
        <section>
          <div className="mb-6 flex items-center justify-between font-semibold">
            <h2>Vistas recentemente</h2>
            <h3>
              <Link href="/songs">Ver todas</Link>
            </h3>
          </div>

          <div className="grid w-full grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {songs.map((song) => {
              return (
                <SongCard key={song.id} id={song.id} name={song.name}>
                  <Tom tom={song.tone} />
                </SongCard>
              )
            })}
          </div>
        </section>
        <section>
          <div className="mb-6 flex items-center justify-between font-semibold">
            <h2>Álbums</h2>
            <h3>
              <Link href="/albums">Ver todas</Link>
            </h3>
          </div>
          <div className="grid w-full grid-cols-5 gap-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
            {albums.map((album) => {
              const songsNames = album.songs.flatMap((song) => {
                return song.name
              })
              return (
                <AlbumCard
                  id={album.id}
                  key={album.id}
                  name={album.name}
                  songs={songsNames}
                />
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}