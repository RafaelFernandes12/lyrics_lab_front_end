import AddIcon from '@mui/icons-material/Add'

interface buttonProps {
    handleClick: () => void
    text: string
}

export function Button({handleClick, text} : buttonProps){
    return(
        <button
        className="flex items-center gap-2 bg-[#567EBB] p-3"
        onClick={handleClick}
      >
        <div className="h-fit w-fit">
          <AddIcon className="text-white" />
        </div>
        <span className="text-white max-sm:hidden">{text}</span>
      </button>
    )
}