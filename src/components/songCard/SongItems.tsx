import Link from 'next/link'
import { ClassNameValue, twMerge } from 'tailwind-merge'

export function Album({
  album,
  className,
}: {
  className?: ClassNameValue
  album: string[]
}) {
  return (
    <span className={twMerge('truncate font-semibold text-white', className)}>
      {album.join(', ')}
    </span>
  )
}
export function CreatedAt({
  createdAt,
  className,
}: {
  className?: ClassNameValue
  createdAt: string
}) {
  return (
    <span className={twMerge('text-semibold truncate text-white', className)}>
      {createdAt}
    </span>
  )
}
export function Name({
  id,
  name,
  className,
}: {
  className?: ClassNameValue
  id: number
  name: string
}) {
  return (
    <Link href={`/song/${id}`}>
      <span
        className={twMerge(
          'truncate text-xl font-semibold text-white',
          className,
        )}
      >
        {name}
      </span>
    </Link>
  )
}

export function Tone({
  tom,
  className,
}: {
  className?: ClassNameValue
  tom: string
}) {
  return (
    <span className={twMerge('truncate font-semibold text-white', className)}>
      {tom}
    </span>
  )
}
