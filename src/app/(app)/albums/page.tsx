import GenericCreate from '@/components/genericCreate/GenericCreate'
import { AlbumList } from './components/AlbumList'

export default function Albums() {
  return (
    <div>
      <section className="flex items-center justify-between">
        <h1>Álbuns</h1>
        <GenericCreate title={'álbum'} type="album" />
      </section>
      <section>
        <AlbumList />
      </section>
    </div>
  )
}
