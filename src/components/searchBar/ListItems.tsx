import { albumProps } from '@/models/albumProps'
import { songProps } from '@/models/songProps'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'

interface albumItemsProps {
  album: albumProps
  search: string
}

interface songItemsProps {
  song: songProps
  album?: albumProps
  search: string
}

const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) {
    return text
  }

  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span
        key={index}
        className="font-semibold text-blue-500 dark:text-blue-500"
      >
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export function Title({ title }: { title: string }) {
  return (
    <li>
      <span className="p-2 text-sm font-semibold text-gray-700">{title}</span>
    </li>
  )
}

export function SongItem({ song, album, search }: songItemsProps) {
  return (
    <>
      <li
        key={song.id + (album?.id || 79312391623712)}
        className="mx-4 mb-1 w-[calc(100%-24px)] truncate rounded-md border-slate-500 p-1 hover:border-[1px] hover:bg-slate-200 hover:p-1.5 dark:hover:bg-slate-900"
      >
        <LibraryMusicOutlinedIcon className="mr-2 dark:text-white" />
        <span key={album?.id}>
          {!album || album?.isDefault ? '' : highlightText(album.name, search)}
        </span>
        <span className={`${!album || album?.isDefault ? 'hidden' : ''}`}>
          /
        </span>
        <span>{highlightText(song.name, search)}</span>
      </li>
    </>
  )
}

export function AlbumItem({ search, album }: albumItemsProps) {
  return (
    <li className="mx-4 mb-1 w-[calc(100%-24px)] truncate rounded-md border-slate-500 p-1 hover:border-[1px] hover:bg-slate-200 hover:p-1.5 dark:hover:bg-slate-900">
      <LibraryBooksOutlinedIcon className="mr-2 dark:text-white" />
      <span className="p-2">{highlightText(album.name, search)}</span>
    </li>
  )
}
