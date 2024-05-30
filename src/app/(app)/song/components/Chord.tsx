import { useState } from "react";

export default function Chord() {
  const[chord, setChord] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setChord(evento.target.value);

    const textLength = evento.target.value.length;
    const newWidth = Math.max(8, textLength * 7);

    evento.target.style.width = newWidth + 'px';
  }
  return(
    <input
      className="w-6 outline-none bg-red-300 text-xs font-mono"
      type="text"
      value={chord}
      onChange={handleChange}
    />
  )
}