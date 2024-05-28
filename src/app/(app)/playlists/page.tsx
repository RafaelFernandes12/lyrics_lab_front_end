import { PlaylistCard } from '@/components/PlaylistCard/PlaylistCard'
import AddIcon from '@mui/icons-material/Add'

export default function Playlists() {
  return (
    <>
      <section className="flex items-center justify-between">
        <h1>Playlists</h1>
        <button className="flex items-center gap-2 bg-black p-3 text-white">
          <AddIcon className="dark:text-black" />
          <span className="max-sm:hidden">Adicionar playlist</span>
        </button>
      </section>
      <section>
        <ul className="grid grid-cols-5 items-center gap-8 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
          <li>
            <PlaylistCard />
          </li>
        </ul>
      </section>
    </>
  )
}
