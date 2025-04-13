import { TAlbum, TSong } from '@/models'

interface MediaItemProps {
  item: TSong | TAlbum
  search: string
  icon: React.ReactNode
}

interface TitleProps {
  title: string
}

const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) return text
  const regex = new RegExp(`(${highlight})`, 'gi')
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={i} className="font-semibold text-blue-500">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export function Title({ title }: TitleProps) {
  return (
    <li>
      <p className="p-2 text-sm font-semibold text-gray-700">{title}</p>
    </li>
  )
}

export function MediaItem({ item, search, icon }: MediaItemProps) {
  return (
    <li
      key={item.id}
      className="mx-4 mb-1 flex w-[calc(100%-24px)] items-center gap-2 truncate rounded-md border-slate-500 p-1 hover:border-[1px] hover:bg-slate-200 hover:p-1.5"
    >
      {icon}
      <p>{highlightText(item.name, search)}</p>
    </li>
  )
}
