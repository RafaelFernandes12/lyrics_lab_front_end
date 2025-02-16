<<<<<<< HEAD
import SearchIcon from '@mui/icons-material/Search'
import { ClassNameValue, twMerge } from 'tailwind-merge'

interface buttonInputProps {
  className?: ClassNameValue
  title: string
=======
import SearchIcon from "@mui/icons-material/Search";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface buttonInputProps {
  className?: ClassNameValue;
  title: string;
>>>>>>> main
}

export function ButtonInput({ className, title }: buttonInputProps) {
  return (
    <button
      data-testid="searchButton"
<<<<<<< HEAD
      className={twMerge('flex w-56 items-center gap-2', className)}
=======
      className={twMerge(
        "flex w-56 items-center gap-2",
        className,
      )}
>>>>>>> main
    >
      <SearchIcon />
      <p className="w-44 bg-transparent text-start text-black dark:text-gray-400">
        {title}
      </p>
    </button>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> main
}
