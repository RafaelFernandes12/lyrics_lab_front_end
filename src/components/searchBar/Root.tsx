'use client'
import { ChangeEvent, RefObject } from 'react'
import { SearchBar } from './SearchBar'

interface searchBarProps {
  setSearch: (e: ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
  style?: React.CSSProperties
  searchRef: RefObject<HTMLDivElement>
  handleClick: () => void
}

export function Root({
  setSearch,
  children,
  style,
  searchRef,
  handleClick,
}: searchBarProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white/20 px-20 py-4" style={style}>
      <div
        className="mt-2 w-full rounded-lg bg-white dark:border-2 dark:border-emerald-400 dark:bg-black"
        ref={searchRef}
      >
        <SearchBar handleClick={handleClick} setSearch={setSearch} />
        <ul className="h-96 overflow-y-auto">{children}</ul>
      </div>
    </div>
  )
}
