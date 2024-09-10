import { ChangeEvent } from 'react'

interface inputProps {
  state: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export function ButtonDialogInput({ state, placeholder }: inputProps) {
  return (
    <div className="flex w-full flex-col">
      <label>
        <p>{placeholder}</p>
      </label>
      <input
        className="rounded-lg bg-gray-200 p-3"
        type="email"
        onChange={state}
      />
    </div>
  )
}
