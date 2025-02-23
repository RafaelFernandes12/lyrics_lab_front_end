'use client'

import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

interface searchBarProps {
  searchValue: string
  setSearch: (e: ChangeEvent<HTMLInputElement>) => void
  body: React.ReactNode
  header: React.ReactNode
}

export function Root({ setSearch, body, searchValue, header }: searchBarProps) {
  const [open, setOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => setOpen(!open), [open])

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-20">
          <div
            className="mt-2 w-2/3 rounded-lg bg-gray-100 dark:bg-headerDark"
            ref={searchRef}
          >
            <div className="mb-4 flex items-center gap-4 rounded-t-md border-b-2 border-gray-200 px-2 dark:border-black">
              <SearchOutlined
                className="dark:text-white"
                data-testid="searchIconId"
              />
              <input
                autoFocus
                value={searchValue}
                placeholder="Pesquisar"
                className="w-full appearance-none bg-black bg-transparent p-2 focus:border-transparent focus:outline-none dark:text-white"
                onChange={setSearch}
              />

              <button onClick={handleClick} data-testid="closeButtonId">
                <CloseOutlined className="dark:text-white" />
              </button>
            </div>
            <ul className="h-96 overflow-y-auto">{body}</ul>
          </div>
        </div>
      )}
    </div>
  )
}
