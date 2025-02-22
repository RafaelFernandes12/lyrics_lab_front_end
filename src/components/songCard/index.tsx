import logo from '@/assets/logo.svg'
import { TSong } from '@/models'
import Image from 'next/image'
import Link from 'next/link'

interface SongCardProps {
  song: TSong
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/song/${song.id}`} className="w-full">
      <div className="flex items-center rounded bg-primaria px-3 py-4 hover:bg-primariaHover">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={40}
          className="h-[40px] w-[60px] object-cover"
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
        <div className="ml-3 truncate" data-testid="container">
          <div className="flex items-center gap-4">
            <div className="flex w-full flex-col">
              <span className="truncate text-xl font-semibold text-white">
                {song.name}
              </span>
              <span className="truncate text-white">Tom: {song.tone}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
