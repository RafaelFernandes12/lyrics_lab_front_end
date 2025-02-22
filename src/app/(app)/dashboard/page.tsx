import dashSection from '@/assets/section.svg'
import GenericCreate from '@/components/genericCreate/GenericCreate'
import Image from 'next/image'
import { AlbumList } from './components/AlbumList'
import { SongList } from './components/SongList'

export default async function Home() {
  return (
    <div>
      <section>
        <section className="relative">
          <Image
            src={dashSection}
            alt="dash-section"
            className="w-full object-contain"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-[40px] left-[40px] px-4 py-2">
            <GenericCreate title={'Música'} type={'song'} />
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
