import { AlbumList } from './components/AlbumList'
import { SongList } from './components/SongList'

export default async function Home() {
  return (
    <div>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <h1>Músicas criadas recentemente</h1>
        </div>
        <SongList />
      </section>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <h1>Álbuns criados recentemente</h1>
        </div>
        <AlbumList />
      </section>
    </div>
  )
}
