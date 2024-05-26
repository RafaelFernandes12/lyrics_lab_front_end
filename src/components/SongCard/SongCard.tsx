import MoreVertIcon from '@mui/icons-material/MoreVert'

interface SongCardProps {
  children: React.ReactNode
}

export default function SongCard({ children }: SongCardProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border-2 border-black px-3 py-6">
      <div className="w-1/2">
        <span>Boate Azul</span>
      </div>
      <div className="flex w-1/2 items-center justify-between">{children}</div>
      <div className="ml-4">
        <MoreVertIcon />
      </div>
    </div>
  )
}
