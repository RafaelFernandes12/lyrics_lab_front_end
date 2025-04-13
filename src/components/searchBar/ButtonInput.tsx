import { SearchOutlined } from '@ant-design/icons'
import { ClassNameValue, twMerge } from 'tailwind-merge'

interface buttonInputProps {
  className?: ClassNameValue
  title: string
}

export function ButtonInput({ className, title }: buttonInputProps) {
  return (
    <button
      data-testid="searchButton"
      className={twMerge('flex w-56 items-center gap-2', className)}
    >
      <SearchOutlined />
      <p className="w-44 bg-transparent text-start text-black">{title}</p>
    </button>
  )
}
