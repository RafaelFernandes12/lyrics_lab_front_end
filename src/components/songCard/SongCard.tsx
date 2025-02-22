import logo from '@/assets/logo.svg'
import { TSong } from '@/models'
import Image from 'next/image'
import Link from 'next/link'

interface SongCardProps {
  song: TSong
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/song/${song.id}`}>
      <div className="bg-primaria hover:bg-primariaHover flex w-10/12 items-center rounded px-3 py-4">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={40}
          className="h-[40px] w-[60px] object-cover"
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
        <div className="ml-3" data-testid="container">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="truncate text-xl font-semibold text-white">
                  {song.name}
                </span>
                <p>
                  <span className="text-white">Tom: </span>
                  <span className="truncate font-semibold text-white">
                    {song.tone}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
