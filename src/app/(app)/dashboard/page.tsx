import sectionImage from '@/assets/section.svg'
import CreateButton from '@/components/createButton'
import Image from 'next/image'
import { AlbumList } from './components/AlbumList'
import { SongList } from './components/SongList'

export default async function Home() {
  return (
    <div>
      <section>
        <section className="relative max-md:mb-[2rem]">
          <Image
            src={sectionImage}
            alt="dash-section"
            className="w-full object-contain max-md:hidden"
            style={{ objectFit: 'cover' }}
          />
          <div className="md:relative md:bottom-[70px] md:left-[40px] lg:bottom-[90px]">
            <CreateButton title="música" type="song" />
          </div>
        </section>

        <div className="mb-6 flex items-center justify-between font-semibold">
          <p className="text-2xl max-sm:text-xl">
            Músicas criadas recentemente
          </p>
        </div>
        <SongList />
      </section>
      <section>
        <div className="mb-6 flex items-center justify-between font-semibold">
          <p className="text-2xl max-sm:text-xl">Álbuns criados recentemente</p>
        </div>
        <AlbumList />
      </section>
    </div>
  )
}
