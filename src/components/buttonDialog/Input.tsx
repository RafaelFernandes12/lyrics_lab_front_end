import { ChangeEvent } from 'react'

interface inputProps {
  state: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  type?: string
}

export function Input({ state, placeholder, value, type }: inputProps) {
  return (
    <div className="flex w-full flex-col">
      <label>
        <p className="dark:text-black">{placeholder}</p>
      </label>
      <input
        className="rounded-lg bg-gray-200 p-3"
        onChange={state}
        value={value}
        type={type}
<<<<<<< HEAD
        data-testid="input"
=======
        data-testid='input'
>>>>>>> main
      />
    </div>
  )
}
