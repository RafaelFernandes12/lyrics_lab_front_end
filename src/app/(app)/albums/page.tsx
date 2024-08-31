import { AlbumCard } from '@/components/albumCard/AlbumCard'
import { serverGetAllAlbums } from '@/operations/albums/server-side/getAll'
import { CreateAlbumDialog } from './components/CreateAlbumDialog'

export default async function Algums() {
  const albums = (await serverGetAllAlbums()) || []
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Álbuns</h1>
        <CreateAlbumDialog />
      </section>
      <section>
        <ul className="grid grid-cols-5 items-center gap-8 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          {albums.map((album) => {
            const songsNames = album.songs.flatMap((song) => {
              return song.name
            })
            return (
              <li key={album.id}>
                <AlbumCard id={album.id} name={album.name} songs={songsNames} />
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
