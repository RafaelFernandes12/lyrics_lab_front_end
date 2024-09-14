import logo from '@/assets/logo.svg'
import { DeleteMenuItem } from '@/components/albumCard/DeleteMenuItem'
import { EditMenuItem } from '@/components/albumCard/EditMenuItem'
import { SongCard } from '@/components/songCard/Index'
import { serverGetAlbum } from '@/operations/albums/server-side/getOne'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { Thead } from '../components/Thead'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface albumProps {
  params: {
    id: number
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Album({ params, searchParams }: albumProps) {
  const album = await serverGetAlbum(params.id)
  let sortedSongs = album?.songs

  const sortedByTitle = searchParams.sortedByTitle
  const sortedByDay = searchParams.sortedByDay

  if (sortedByTitle === 'true') {
    sortedSongs = album?.songs.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortedByTitle === 'false') {
    sortedSongs = album?.songs.sort((a, b) => b.name.localeCompare(a.name))
    console.log(sortedSongs)
  }

  if (sortedByDay === 'true') {
    sortedSongs = album?.songs.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    )
  }
  if (sortedByDay === 'false') {
    sortedSongs = album?.songs.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    )
    console.log(sortedSongs)
  }
  return (
    <>
      <section className="flex w-full gap-7 max-sm:flex-col max-sm:text-center">
        <Image
          src={album?.image || logo}
          alt="example"
          width={208}
          height={208}
          style={{ objectFit: album?.image ? 'cover' : 'contain' }}
          className={`h-52 w-52 rounded-xl bg-slate-200 ${album?.image ? 'object-cover' : 'object-contain'}`}
        />
        <div className="flex w-full flex-col items-start justify-between py-4">
          <h1>{album?.name}</h1>
          <span>{album?.songs.length} músicas</span>
          <p className="w-10/12">{album?.description}</p>
          <div className="w-32">
            <EditMenuItem id={params.id} color="text-white" />
            <DeleteMenuItem id={params.id} color="text-white" />
          </div>
        </div>
      </section>
      {album?.songs?.length !== 0 && (
        <table className="w-full border-separate border-spacing-y-4">
          <Thead />
          <tbody>
            {sortedSongs?.map((song, i) => {
              const bgColor = i % 2 === 0 ? '#567EBB' : '#606D80'

              return (
                <tr
                  key={song.id}
                  className="w-full rounded py-5"
                  style={{ backgroundColor: bgColor }}
                >
                  <td className="flex items-center py-5">
                    <SongCard.ThreeDots>
                      <SongCard.EditMenuItem id={song.id} />
                      <SongCard.DeleteMenuItem id={song.id} />
                    </SongCard.ThreeDots>
                    <SongCard.Name id={song.id} name={song.name} />
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
