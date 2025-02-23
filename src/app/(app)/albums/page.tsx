import CreateButton from '@/components/createButton'
import { AlbumList } from './components/AlbumList'

export default function Albums() {
  return (
    <div>
      <section className="flex items-center justify-between">
        <h1>Álbuns</h1>
        <CreateButton title={'álbum'} type="album" />
      </section>
      <section>
        <AlbumList />
      </section>
    </div>
  )
}
