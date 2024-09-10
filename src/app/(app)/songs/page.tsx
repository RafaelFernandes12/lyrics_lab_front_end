import { SongCard } from '@/components/SongCard/index'
import { serverGetAllSongs } from '@/operations/songs/server-side/getAll'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CreateSongDialog } from './components/CreateSongDialog'
import { Thead } from './components/Thead'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default async function Songs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const songs = (await serverGetAllSongs()) || []
  let sortedSongs = songs

  const sortedByTitle = searchParams.sortedByTitle
  const sortedByDay = searchParams.sortedByDay

  if (sortedByTitle === 'true') {
    sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortedByTitle === 'false') {
    sortedSongs = songs.sort((a, b) => b.name.localeCompare(a.name))
    console.log(sortedSongs)
  }
  if (sortedByDay === 'true') {
    sortedSongs = songs.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  }
  if (sortedByDay === 'false') {
    sortedSongs = songs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    console.log(sortedSongs)
  }

  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <CreateSongDialog />
      </section>

      {songs.length === 0 ? (
        <p className="text-gray-500">Você ainda não criou nenhuma música.</p>
      ) : (
        <table className="w-full border-separate border-spacing-y-4">
          <Thead />
          <tbody>
            {sortedSongs.map((song, i) => {
              let bgColor = ''
              if (i % 2 === 0) bgColor = '#567EBB'
              else bgColor = '#606D80'

              return (
                <tr
                  key={song.id}
                  className={`w-full rounded py-5`}
                  style={{ backgroundColor: bgColor }}
                >
                  <td className="flex items-center py-5">
                    <SongCard.ThreeDots id={song.id} />
                    <SongCard.Name id={song.id} name={song.name} />
                  </td>
                  <td className="py-5">
                    <SongCard.Album
                      album={song.albums
                        .filter((album) => !album.isDefault)
                        .map((album) => album.name)}
                    />
                  </td>
                  <td className="py-5">
                    <SongCard.Tone tom={song.tone} />
                  </td>
                  <td className="py-5 pr-4 text-right">
                    <SongCard.CreatedAt
                      createdAt={dayjs().to(song.createdAt)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}
