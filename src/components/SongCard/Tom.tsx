'use client'

import { usePathname } from 'next/navigation'

export function Tom() {
  const pathname = usePathname()
  return (
    <span className={`${pathname.includes('songs') ? 'max-sm:hidden' : ''}`}>
      <span
        className={`${pathname.includes('songs') || pathname.includes('playlist') ? 'hidden' : ''}`}
      >
        Tom:
      </span>{' '}
      <span className="font-semibold text-blue-700 dark:text-blue-500">
        CM7
      </span>
    </span>
  )
}
