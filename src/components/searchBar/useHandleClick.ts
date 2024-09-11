import { useCallback, useEffect, useRef, useState } from "react"

export function useHandleClick(){
    const [open, setOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const handleClick = useCallback(() => {
        setOpen(!open)
    }, [open])
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (
            searchRef.current &&
            !searchRef.current.contains(event.target as Node)
          ) {
            if (open) {
              handleClick()
            }
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [handleClick, open])
    return {handleClick, open, setOpen, searchRef}
}