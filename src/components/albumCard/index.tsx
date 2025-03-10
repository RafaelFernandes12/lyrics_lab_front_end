import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

interface albumCardProps {
  id: number
  name: string
  image: string | null
}

export function AlbumCard(props: albumCardProps) {
  return (
    <Link
      href={`/album/${props.id}`}
      className="block h-[240px] w-[200px] transition-transform duration-200 hover:scale-105"
    >
      <div className="flex flex-col items-center space-y-2 rounded-lg">
        <div
          className="flex h-[180px] w-[200px] items-center justify-center overflow-hidden rounded-lg bg-gray-200"
          style={{
            background: props.image
              ? `center / cover no-repeat url(${props.image})`
              : undefined,
          }}
        >
          {!props.image && (
            <Image
              src={logo}
              alt={props.name}
              width={140}
              height={120}
              className="object-contain"
            />
          )}
        </div>
        <p className="w-full truncate text-left text-xl font-semibold">
          {props.name}
        </p>
      </div>
    </Link>
  )
}
