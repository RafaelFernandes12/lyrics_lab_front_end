import Link from 'next/link'
interface nameProps {
  id: number
  name: string
}
export function Name({ id, name }: nameProps) {
  return (
    <Link href={`/song/${id}`}>
      <span className="text-xl font-semibold text-white">{name}</span>
    </Link>
  )
}
