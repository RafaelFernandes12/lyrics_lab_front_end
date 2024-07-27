import { Album } from '@/components/SongCard/Album'
import CreatedAt from '@/components/SongCard/CreatedAt'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import { getPlaylists } from '@/operations/playlistRoutes/getPlaylists'
import { getSongs } from '@/operations/songRoutes/getSongs'
import AddIcon from '@mui/icons-material/Add'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default async function Songs() {
  const songs = (await getSongs()) || []
  const playlists = (await getPlaylists()) || []
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <button className="flex items-center gap-2 bg-blue-800 p-3">
          <AddIcon className="text-white" />
          <span className="text-white max-sm:hidden">Adicionar música</span>
        </button>
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
                album={playlists.map((playlist) => {
                  if (playlist.id === song.playlistId) return playlist.name
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
