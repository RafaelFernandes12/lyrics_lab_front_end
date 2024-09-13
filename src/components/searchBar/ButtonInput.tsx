import SearchIcon from '@mui/icons-material/Search'
import { ClassNameValue, twMerge } from 'tailwind-merge'
interface buttonInputProps {
  handleClick: () => void
  className?: ClassNameValue
  title: string
}

export function ButtonInput({
  handleClick,
  className,
  title,
}: buttonInputProps) {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        'flex w-56 items-center gap-2 border-none bg-gray-200',
        className,
      )}
    >
      <SearchIcon />
      <p className="w-44 bg-transparent text-start text-black dark:text-gray-400">
        {title}
      </p>
    </button>
  )
}
