import { useState } from 'react';

export default function TextLine() {
  const[line, setLine] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value);
  }

  return(
    <input 
      className="bg-lime-200 w-[280px] mb-3 outline-none text-sm font-mono" 
      type="text" 
      maxLength={35}
      value={line} 
      onChange={handleChange}
      placeholder="Linha de texto"
    />
  );
}