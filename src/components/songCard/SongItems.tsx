import { TSong, TAlbum } from '@/models/models'
import Link from 'next/link'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function Album({
  albums,
  className,
}: {
  className?: ClassNameValue
  albums: TAlbum[]
}) {
  const albumsName = albums.filter((album) => !album.isDefault)
    .map((album) => album.name)

  return (
    <span className={twMerge('truncate font-semibold text-white', className)}>
      {albumsName.join(', ')}
    </span>
  )
}
export function CreatedAt({
  song,
  className,
}: {
  className?: ClassNameValue
  song: TSong
}) {
  return (
    <span className={twMerge('text-semibold truncate text-white', className)}>
      {dayjs().to(song.createdAt)}
    </span>
  )
}
export function Name({
  song,
  className,
}: {
  className?: ClassNameValue
  song: TSong
}) {
  return (
    <Link href={`/song/${song.id}`}>
      <span
        className={twMerge(
          'truncate text-xl font-semibold text-white',
          className,
        )}
      >
        {song.name}
      </span>
    </Link>
  )
}

export function Tone({
  song,
  className,
}: {
  className?: ClassNameValue
  song: TSong
}) {
  return (
    <span className={twMerge('truncate font-semibold text-white', className)}>
      {song.tone}
    </span>
  )
}
