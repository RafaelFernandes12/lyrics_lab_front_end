import { ClassNameValue, twMerge } from 'tailwind-merge'
interface SongCardProps {
  className?: ClassNameValue
  children: React.ReactNode
}

export function Root(props: SongCardProps) {
  return (
    <div className="flex w-full items-center rounded bg-blueButton px-3 py-4">
      <div className={twMerge(``, props.className)} data-testid='container'>{props.children}</div>
    </div>
  )
}
