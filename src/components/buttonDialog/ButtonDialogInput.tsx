import { ChangeEvent } from 'react'

interface inputProps {
  state: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export function ButtonDialogInput({ state, placeholder }: inputProps) {
  return (
    <input
      placeholder={placeholder}
      onChange={state}
      className="rounded-lg border-[1px] border-black p-2"
    />
  )
}
