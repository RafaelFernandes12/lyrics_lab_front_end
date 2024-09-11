'use client'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import 'dayjs/locale/pt-br'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Thead() {
  const [isSortedByTitle, setIsSortedByTitle] = useState(false)
  const [isSortedByDay, setIsSortedByDay] = useState(false)
  const router = useRouter()

  function handleSortByTitle() {
    setIsSortedByTitle(!isSortedByTitle)
    router.push(`?sortedByTitle=${isSortedByTitle}`)
  }
  function handleSortByDay() {
    setIsSortedByDay(!isSortedByDay)
    router.push(`?sortedByDay=${isSortedByDay}`)
  }

  return (
    <thead>
      <tr className="w-full">
        <th className="w-1/5 pl-4 text-left">
          <button className="p-0" onClick={handleSortByTitle}>
            <span>Titulo</span>
          </button>
        </th>
        <th className="w-2/5 text-left max-sm:hidden">
          <span>Álbum</span>
        </th>
        <th className="w-1/5 text-left max-sm:hidden">
          <span>Tom</span>
        </th>
        <th className="w-1/5 text-right">
          <button className="p-0" onClick={handleSortByDay}>
            <span>Adicionado</span>
            <ArrowDropDownIcon className="dark:text-white" />
          </button>
        </th>
      </tr>
    </thead>
  )
}
