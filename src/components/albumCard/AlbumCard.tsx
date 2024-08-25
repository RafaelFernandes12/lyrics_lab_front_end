import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ThreeDots } from './ThreeDots'

interface albumCardProps {
  id: number
  name: string
  songs: string[]
}

export function AlbumCard(props: albumCardProps) {
  return (
    <div className="flex w-64 flex-col">
      <Link href={`/album/${props.id}`}>
        <Image
          src={logo}
          alt="example"
          className="m-auto h-52 w-64 flex-col rounded-xl bg-gray-500 dark:bg-gradient-to-b dark:from-zinc-700/70 dark:to-zinc-700/20"
        />
      </Link>
      <div className="flex w-full items-center justify-between">
        <div className="w-10/12">
          <p className="text-xl font-semibold ">{props.name}</p>
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
        <ThreeDots id={props.id} />
      </div>
    </div>
  )
}
