import { SongCard } from '@/components/songCard/Index'
import { ThreeDots } from '@/components/ThreeDots'
import { TSong } from '@/models'
import { get } from '@/services/axios'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { CreateSongDialog } from './components/CreateSongDialog'
import { Thead } from './components/Thead'

export default async function Songs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = (await getCookie('jwt', { cookies })) || ''
  const songs: TSong[] = (await get<TSong[]>('song', token)) || []

  let sortedSongs = songs
  const sortedByTitle = searchParams?.sortedByTitle
  const sortedByDay = searchParams?.sortedByDay

  if (sortedByTitle === 'true') {
    sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortedByTitle === 'false') {
    sortedSongs = songs.sort((a, b) => b.name.localeCompare(a.name))
    console.log(sortedSongs)
  } else if (sortedByDay === 'true') {
    sortedSongs = songs.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  } else if (sortedByDay === 'false') {
    sortedSongs = songs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    console.log(sortedSongs)
  }

  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <CreateSongDialog token={token} />
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
                  className="w-full rounded py-5"
                  style={{ backgroundColor: bgColor }}
                >
                  <td className="flex items-center py-5">
                    <ThreeDots>
                      <SongCard.EditMenuItem id={song.id} />
                      <SongCard.DeleteMenuItem id={song.id} />
                    </ThreeDots>
                    <SongCard.Name song={song} />
                  </td>
                  <td className="py-5 max-sm:hidden">
                    <SongCard.Album
                      className="max-w-6 truncate"
                      albums={song.albums}
                    />
                  </td>
                  <td className="py-5 max-sm:hidden">
                    <SongCard.Tone song={song} />
                  </td>
                  <td className=" py-5 pr-4 text-right">
                    <SongCard.CreatedAt song={song} />
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
