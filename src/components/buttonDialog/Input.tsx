import { ChangeEvent } from 'react'

interface inputProps {
  state: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
}

export function Input({ state, placeholder, value }: inputProps) {
  return (
    <input
      placeholder={placeholder}
      onChange={state}
      value={value}
      className="rounded-lg border-[1px] border-black p-2 dark:bg-gray-600 dark:text-white"
    />
  )
}
