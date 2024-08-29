import { Album } from '@/components/SongCard/Album'
import CreatedAt from '@/components/SongCard/CreatedAt'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import { getAlbums } from '@/operations/albumRoutes/getAlbums'
import { getSongs } from '@/operations/songRoutes/getSongs'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CreateSongDialog } from './components/CreateSongDialog'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default async function Songs() {
  const songs = (await getSongs()) || []
  const albums = (await getAlbums()) || []
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <CreateSongDialog />
      </section>

      <section className="flex flex-col gap-4">
        <ul className="mx-2 flex font-semibold max-sm:justify-between">
          <li className="w-1/2 max-sm:w-fit">
            <span>Titulo</span>
          </li>
          <div className="mr-10 flex w-1/2 justify-between max-sm:w-fit">
            <li className="w-full">
              <span>Álbum</span>
            </li>
            <li className="w-full max-sm:hidden">
              <span>Tom</span>
            </li>
            <li className="-mr-5 flex text-center max-sm:hidden">
              <span>Adicionado</span>
              <ArrowDropDownIcon className="dark:text-white" />
            </li>
          </div>
        </ul>
        {songs.map((song) => {
          return (
            <SongCard name={song.name} key={song.id} id={song.id}>
              <Album
                album={albums.map((album) => {
                  if (album.id === song.albumId) return album.name
                  return ''
                })}
              />
              <Tom />
              <CreatedAt createdAt={dayjs().to(song.createdAt)} />
            </SongCard>
          )
        })}
      </section>
    </>
  )
}
