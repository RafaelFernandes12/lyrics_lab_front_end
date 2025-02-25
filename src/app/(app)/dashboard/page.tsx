import sectionImage from '@/assets/section.svg'
import CreateButton from '@/components/createButton'
import Image from 'next/image'
import { AlbumList } from './components/AlbumList'
import { SongList } from './components/SongList'

export default async function Home() {
  return (
    <div>
      <section>
        <section className="relative">
          <Image
            src={sectionImage}
            alt="dash-section"
            className="w-full object-contain"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-[40px] left-[40px] px-4 py-2">
            <CreateButton title="música" type="song" />
          </div>
        </section>

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
