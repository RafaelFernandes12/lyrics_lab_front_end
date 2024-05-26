import { PlaylistCard } from '@/components/PlaylistCard/PlaylistCard'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <h2 className="text-3xl">Vistas recentemente</h2>
          <h3 className="text-2xl">
            <Link href="/">Ver todas</Link>
          </h3>
        </div>

        <div className="grid w-full grid-cols-4 gap-4">
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
          <h2 className="text-3xl">Playlists</h2>
          <h3 className="text-2xl">
            <Link href="/">Ver todas</Link>
          </h3>
        </div>
        <div className="grid w-full grid-cols-5 gap-4">
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
  )
}
