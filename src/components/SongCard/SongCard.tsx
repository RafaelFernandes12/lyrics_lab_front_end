import MoreVertIcon from '@mui/icons-material/MoreVert';

interface SongCardProps {
  children: React.ReactNode
}

export default function SongCard({ children }: SongCardProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border-2 border-black px-3 py-6 dark:bg-gradient-to-b dark:from-zinc-700/70 dark:to-zinc-700/20 dark:border-none">
      <div className="w-1/2">
        <span>Boate Azul</span>
      </div>
      <div className="flex w-1/2 items-center justify-between max-sm:justify-end">{children}</div>
      <div className="ml-4">
        <MoreVertIcon className='dark:text-white'/>
      </div>
    </div>
  );
}
