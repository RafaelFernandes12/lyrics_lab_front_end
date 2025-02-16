<<<<<<< HEAD
import { TAlbum, TSong } from '@/models'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { ClassNameValue, twMerge } from 'tailwind-merge'
=======
import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import Link from 'next/link'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
>>>>>>> main

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function Album({
  albums,
  className,
}: {
  className?: ClassNameValue
<<<<<<< HEAD
  albums: TAlbum[]
}) {
  const albumsName = albums
    .filter((album) => !album.isDefault)
=======
  albums: albumProps[]
}) {
  const albumsName = albums.filter((album) => !album.isDefault)
>>>>>>> main
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
<<<<<<< HEAD
  song: TSong
=======
  song: songProps
>>>>>>> main
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
<<<<<<< HEAD
  song: TSong
=======
  song: songProps
>>>>>>> main
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
<<<<<<< HEAD
  song: TSong
=======
  song: songProps
>>>>>>> main
}) {
  return (
    <span className={twMerge('truncate font-semibold text-white', className)}>
      {song.tone}
    </span>
  )
}
