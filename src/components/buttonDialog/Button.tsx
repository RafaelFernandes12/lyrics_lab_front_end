import AddIcon from '@mui/icons-material/Add'

interface buttonProps {
  text: string
}

export function Button({ text }: buttonProps) {
  return (
    <button className="flex items-center gap-2 bg-blueButton p-3">
      <div className="h-fit w-fit">
        <AddIcon className="text-white" data-testid="addIcon" />
      </div>
      <span className="text-white max-sm:hidden">{text}</span>
    </button>
  )
}
