import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ThreeDots } from '../ThreeDots'
import { DeleteMenuItem } from './DeleteMenuItem'
import { EditMenuItem } from './EditMenuItem'

interface albumCardProps {
  id: number
  name: string
  image: string | null
  songs: string[]
}

export function AlbumCard(props: albumCardProps) {
  return (
    <div className="flex h-[285px] w-[240px] flex-col gap-2 rounded-xl bg-slate-200 p-5 dark:bg-headerDark">
      <Link href={`/album/${props.id}`}>
        <Image
          src={props.image || logo}
          alt="example"
          width={200}
          height={180}
          style={{ objectFit: props.image ? 'cover' : 'contain' }}
          className={`m-auto h-[180px] w-[200px] flex-col rounded-xl bg-white ${props.image ? 'object-cover' : 'object-contain'}`}
        />
      </Link>

      <div className="flex w-full items-center justify-between">
        <div className="w-10/12">
          <p className="truncate text-xl font-semibold">{props.name}</p>
          <p className="truncate text-sm">
            {props.songs.map((song, index) => {
              if (props.songs.indexOf(song, index) !== props.songs.length - 1) {
                return (
                  <span key={index}>
                    {song}
                    <span>, </span>
                  </span>
                )
              }
              return <span key={index}>{song}</span>
            })}
          </p>
        </div>
        <ThreeDots color={'dark:text-white'}>
          <EditMenuItem id={props.id} />
          <DeleteMenuItem id={props.id} />
        </ThreeDots>
      </div>
    </div>
  )
}
