import { AlbumCard } from '@/components/albumCard/AlbumCard'
import { SongCard } from '@/components/SongCard/index'
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import { serverGetAllAlbums } from '@/operations/albums/server-side/getAll'
import { serverGetAllSongs } from '@/operations/songs/server-side/getAll'

export default async function Home() {
  const albums: albumProps[] = (await serverGetAllAlbums()) || []
  const songs: songProps[] = (await serverGetAllSongs()) || []

  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <h1>Músicas recentes</h1>
        </div>

        {songs.length === 0 ? (
          <p className="text-gray-500">Você ainda não criou nenhuma música.</p>
        ) : (
          <div className="grid w-full grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {songs
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 6)
              .map((song) => {
                return (
                  <SongCard.Root key={song.id}>
                    <div className="flex items-center gap-4">
                      <SongCard.ThreeDots id={song.id} />
                      <div className="flex flex-col">
                        <SongCard.Name id={song.id} name={song.name} />
                        <p>
                          <span className="text-white">Tom: </span>
                          <SongCard.Tone tom={song.tone} />
                        </p>
                      </div>
                    </div>
                  </SongCard.Root>
                )
              })}
          </div>
        )}
      </section>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <h1>Álbuns</h1>
        </div>
        {albums.length === 0 ? (
          <p className="text-gray-500">Você ainda não criou nenhum álbum.</p>
        ) : (
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
                  image={album.image}
                  songs={songsNames}
                />
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
