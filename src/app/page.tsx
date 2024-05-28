import { Header } from '@/components/Header/Header'
import { PlaylistCard } from '@/components/PlaylistCard/PlaylistCard'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main className="my-10 rounded-md bg-slate-50 p-8 dark:bg-[#141414]">
        <section>
          <div className="mb-6 flex items-center justify-between font-semibold">
            <h2>Vistas recentemente</h2>
            <h3>
              <Link href="/songs">Ver todas</Link>
            </h3>
          </div>

          <div className="grid w-full grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <SongCard>
              <Tom />
            </SongCard>
            <SongCard>
              <Tom />
            </SongCard>
            <SongCard>
              <Tom />
            </SongCard>
            <SongCard>
              <Tom />
            </SongCard>
            <SongCard>
              <Tom />
            </SongCard>
          </div>
        </section>
        <section>
          <div className="mb-6 flex items-center justify-between font-semibold">
            <h2>Playlists</h2>
            <h3>
              <Link href="/playlists">Ver todas</Link>
            </h3>
          </div>
          <div className="grid w-full grid-cols-5 gap-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center">
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
          </div>
        </section>
      </main>
    </>
  )
}
