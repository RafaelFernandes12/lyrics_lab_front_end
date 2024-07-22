import { useState } from 'react'

export default function TextLine() {
  const [line, setLine] = useState('')

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value)
  }

  return (
    <input
      className="mb-3 w-[280px] bg-lime-200 font-mono text-sm outline-none"
      type="text"
      maxLength={35}
      value={line}
      onChange={handleChange}
      placeholder="Linha de texto"
    />
  )
}
