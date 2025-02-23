import { TAlbum, TSong } from '@/models'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'

interface albumItemsProps {
  album: TAlbum
  search: string
}

interface songItemsProps {
  song: TSong
  album?: TAlbum[]
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
      <p key={index} className="font-semibold text-blue-500 dark:text-blue-500">
        {part}
      </p>
    ) : (
      part
    ),
  )
}

export function Title({ title }: { title: string }) {
  return (
    <li>
      <p className="p-2 text-sm font-semibold text-gray-700">{title}</p>
    </li>
  )
}

export function SongItem({ song, album, search }: songItemsProps) {
  function displayAlbum(albums: TAlbum[]) {
    return albums
      .filter((album) => !album.isDefault)
      .map((album, index, filteredAlbums) => (
        <p key={album.id}>
          {highlightText(album.name, search)}
          {index < filteredAlbums.length - 1 ? ', ' : ''}
        </p>
      ))
  }
  return (
    <li
      key={song.id}
      className="mx-4 mb-1 flex w-[calc(100%-24px)] items-center gap-2 truncate rounded-md border-slate-500 p-1 hover:border-[1px] hover:bg-slate-200 hover:p-1.5 dark:hover:bg-slate-900"
    >
      <LibraryMusicOutlinedIcon className="mr-2 dark:text-white" />
      <p>{highlightText(song.name, search)}</p>
      {album && album.length > 1 && (
        <p className="ml-1">[{album && displayAlbum(album)}]</p>
      )}
    </li>
  )
}

export function AlbumItem({ search, album }: albumItemsProps) {
  return (
    <li className="mx-4 mb-1 flex w-[calc(100%-24px)] items-center gap-2 truncate rounded-md border-slate-500 p-1 hover:border-[1px] hover:bg-slate-200 hover:p-1.5 dark:hover:bg-slate-900">
      <LibraryBooksOutlinedIcon className="mr-2 dark:text-white" />
      <p className="p-2">{highlightText(album.name, search)}</p>
    </li>
  )
}
