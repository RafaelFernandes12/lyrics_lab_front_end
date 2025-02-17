import { AlbumList } from './components/AlbumList'
import { CreateAlbumDialog } from './components/CreateAlbumDialog'

export default async function Albums() {
  return (
    <div>
      <section className="flex items-center justify-between">
        <h1>Álbuns</h1>
        <CreateAlbumDialog />
      </section>
      <section>
        <AlbumList />
      </section>
    </div>
  )
}
