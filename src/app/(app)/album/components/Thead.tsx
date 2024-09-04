'use client'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
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
      <tr>
        <th className="pl-4 text-left">
          <button className="p-0" onClick={handleSortByTitle}>
            <span>Titulo</span>
          </button>
        </th>
        <th className="text-left">
          <span>Tom</span>
        </th>
        <th className="flex justify-end">
          <button className="p-0" onClick={handleSortByDay}>
            <span>Adicionado</span>
          </button>
          <ArrowDropDownIcon className="dark:text-white" />
        </th>
      </tr>
    </thead>
  )
}
