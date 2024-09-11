import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent } from 'react'

interface searchBarProps {
  setSearch: (e: ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  value?: string
}

export function SearchBar({ handleClick, setSearch, value }: searchBarProps) {
  return (
    <div className="mb-4 flex items-center gap-4 rounded-md px-2 focus-within:ring-2 focus-within:ring-blue-500">
      <SearchIcon className="dark:text-white" />
      <input
        placeholder="Pesquisar"
        className="w-full appearance-none bg-black bg-transparent focus:outline-none dark:text-white"
        onChange={setSearch}
        value={value}
      />
      <button onClick={handleClick}>
        <ClearIcon className="mr-2 dark:text-white" />
      </button>
    </div>
  )
}
