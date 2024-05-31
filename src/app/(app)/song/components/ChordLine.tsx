import { useState } from 'react';

export default function ChordLine() {
  const[line, setLine] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value);
  }

  return(
    <input 
      className="bg-transparent w-[280px] font-semibold text-cyan-500 mb-3 outline-none text-xs font-mono" 
      type="text" 
      maxLength={35}
      value={line} 
      onChange={handleChange}
      placeholder="Linha de cifra"
    />
  );
}