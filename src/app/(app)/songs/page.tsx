import { SongCard } from '@/components/SongCard/index'
import { serverGetAllAlbums } from '@/operations/albums/server-side/getAll'
import { serverGetAllSongs } from '@/operations/songs/server-side/getAll'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CreateSongDialog } from './components/CreateSongDialog'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default async function Songs() {
  const songs = (await serverGetAllSongs()) || []
  const albums = (await serverGetAllAlbums()) || []
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Músicas</h1>
        <CreateSongDialog />
      </section>

      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="pl-4 text-left">
              <span>Titulo</span>
            </th>
            <th className="text-left">
              <span>Álbum</span>
            </th>
            <th className="text-left">
              <span>Tom</span>
            </th>
            <th className="flex justify-end">
              <span>Adicionado</span>
              <ArrowDropDownIcon className="dark:text-white" />
            </th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => {
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
                    album={albums.map((album) => {
                      if (album.id === song.albumId) return album.name
                      return ''
                    })}
                  />
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
