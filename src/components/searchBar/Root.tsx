'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

interface searchBarProps {
  setSearch: (e: ChangeEvent<HTMLInputElement>) => void
  body: React.ReactNode
  header: React.ReactNode
}

export function Root({ setSearch, body, header }: searchBarProps) {
  const [open, setOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleClick = () => setOpen(!open)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (open) {
          handleClick()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClick, open])

  return (
    <div>
      <div onClick={handleClick}>{header}</div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 px-20">
          <div
            className="mt-2 w-2/3 rounded-lg border-2 border-zinc-600 bg-gray-100 dark:bg-black"
            ref={searchRef}
          >
            <div className="mb-4 flex items-center gap-4 rounded-t-md border-b-2 border-zinc-600 px-2 focus-within:ring-2 focus-within:ring-blue-500">
              <SearchIcon
                className="dark:text-white"
                data-testid="searchIconId"
              />
              <input
                placeholder="Pesquisar"
                className="w-full appearance-none bg-black bg-transparent focus:outline-none dark:text-white"
                onChange={setSearch}
              />
              <button onClick={handleClick} data-testid="closeButtonId">
                <ClearIcon className="dark:text-white" />
              </button>
            </div>
            <ul className="h-96 overflow-y-auto">{body}</ul>
          </div>
        </div>
      )}
    </div>
  )
}
