import SearchIcon from '@mui/icons-material/Search'
import { ClassNameValue, twMerge } from 'tailwind-merge'
interface buttonInputProps {
  handleClick: () => void
  className?: ClassNameValue
  title: string
}

export function ButtonInput({ handleClick, className, title }: buttonInputProps) {
  return (
    <button onClick={handleClick} className={twMerge("flex w-56 items-center gap-2", className)}>
      <SearchIcon className="dark:text-white" />
      <input
        placeholder={title}
        readOnly
        className='w-44 bg-transparent placeholder:text-black placeholder:dark:text-white'
      />
    </button>
  )
}
