import logo from '@/assets/logo.svg'
import { SongCard } from '@/components/SongCard/index'
import { urlIdProps } from '@/models/urlIdProps'
import { serverGetAlbum } from '@/operations/albums/server-side/getOne'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { IconsAction } from '../components/IconsActions'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default async function Album({ params }: urlIdProps) {
  const album = await serverGetAlbum(params.id)

  return (
    <>
      <section className="flex w-full items-center gap-7 max-sm:flex-col max-sm:text-center">
        <Image
          src={logo}
          alt="example"
          className="h-72 w-80 rounded-xl bg-gray-500 max-sm:h-52 max-sm:w-60"
        />
        <div className="w-full max-sm:flex max-sm:flex-col max-sm:items-center">
          <div className="flex items-center gap-4 text-center">
            <h1>{album?.name}</h1>
            <IconsAction id={params.id} />
          </div>
          <span>{album?.songs.length} músicas</span>
          <p className="mt-6 w-10/12">{album?.description}</p>
        </div>
      </section>
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="pl-4 text-left">Titulo</th>
            <th className="text-left">Tom</th>
            <th className="flex justify-end">
              <span>Adicionado</span>
              <ArrowDropDownIcon className="dark:text-white" />
            </th>
          </tr>
        </thead>
        <tbody>
          {album?.songs.map((song, i) => {
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
                  <SongCard.Tone tom={song.tone} />
                </td>
                <td className="py-5 pr-4 text-right">
                  <SongCard.CreatedAt createdAt={dayjs().to(song.createdAt)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
