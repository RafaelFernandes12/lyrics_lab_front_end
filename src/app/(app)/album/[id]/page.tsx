import logo from '@/assets/logo.svg'
import CreatedAt from '@/components/SongCard/CreatedAt'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
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
      <section className="flex flex-col gap-4">
        <ul className="mx-2 flex font-semibold max-sm:justify-between">
          <li className="w-1/2 max-sm:w-fit">
            <span>Titulo</span>
          </li>
          <div className="mr-10 flex w-1/2 justify-between max-sm:w-fit">
            <li className="w-full">
              <span>Tom</span>
            </li>
            <li className="-mr-5 flex text-center max-sm:hidden">
              <span>Adicionado</span>
              <ArrowDropDownIcon className="dark:text-white" />
            </li>
          </div>
        </ul>
        {album?.songs.map((song) => {
          return (
            <SongCard id={song.id} name={song.name} key={song.id}>
              <Tom tom={song.tone} />
              <CreatedAt createdAt={dayjs().to(song.createdAt)} />
            </SongCard>
          )
        })}
      </section>
    </>
  )
}
