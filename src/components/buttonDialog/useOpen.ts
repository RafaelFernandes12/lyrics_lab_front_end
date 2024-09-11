import { useState } from "react"

export function useOpen(){
    const [open, setOpen] = useState(false)
    function handleClick(){
      setOpen(!open)
    }
    return {open, setOpen, handleClick}
}