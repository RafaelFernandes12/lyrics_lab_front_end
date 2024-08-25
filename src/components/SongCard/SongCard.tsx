import Link from 'next/link'
import { ThreeDots } from './ThreeDots'
interface SongCardProps {
  id: number
  name: string
  children: React.ReactNode
}

export default function SongCard(props: SongCardProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border-2 border-black px-3 py-6 dark:border-none dark:bg-gradient-to-b dark:from-zinc-700/70 dark:to-zinc-700/20">
      <Link
        href={`/song/${props.id}`}
        className="flex w-full items-center justify-center"
      >
        <div className="w-1/2 truncate">
          <span>{props.name}</span>
        </div>
        <div className="flex w-1/2 items-center justify-between max-sm:justify-end">
          {props.children}
        </div>
      </Link>
      <ThreeDots id={props.id} />
    </div>
  )
}
