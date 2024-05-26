'use client'

import { usePathname } from 'next/navigation'

export function Tom() {
  const pathname = usePathname()
  return (
    <span>
      <span className={`${pathname.includes('songs') ? 'hidden' : ''}`}>
        Tom:
      </span>{' '}
      <span className="font-semibold text-blue-700">CM7</span>
    </span>
  )
}
