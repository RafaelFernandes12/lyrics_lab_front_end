import { CreatePlaylistDialog } from '@/app/playlists/components/CreatePlaylistDialog'
import { PlaylistCard } from '@/components/PlaylistCard/PlaylistCard'
import { getPlaylists } from '@/operations/playlistRoutes/getPlaylists'

export default async function Playlists() {
  const playlists = (await getPlaylists()) || []
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Playlists</h1>
        <CreatePlaylistDialog />
      </section>
      <section>
        <ul className="grid grid-cols-5 items-center gap-8 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          {playlists.map((playlist) => {
            const songsNames = playlist.songs.flatMap((song) => {
              return song.name
            })
            return (
              <li key={playlist.id}>
                <PlaylistCard
                  id={playlist.id}
                  name={playlist.name}
                  songs={songsNames}
                />
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
