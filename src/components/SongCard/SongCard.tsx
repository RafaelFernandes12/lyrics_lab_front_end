import MoreVertIcon from '@mui/icons-material/MoreVert'

export default function SongCard() {
  return (
    <div className="flex max-w-96 items-center justify-between rounded-2xl border-2 border-black p-6">
      <span>Boate Azul</span>
      <div className="flex items-center gap-2">
        <span>
          Tom: <span className="font-semibold text-blue-700">CM7</span>
        </span>
        <MoreVertIcon />
      </div>
    </div>
  )
}
