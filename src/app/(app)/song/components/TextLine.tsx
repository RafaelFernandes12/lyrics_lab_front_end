import { useState } from 'react';

export default function TextLine() {
  const[line, setLine] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value);
  }

  return(
    <input 
      className="bg-transparent p-1 w-[280px] mb-3 outline-none bg-lime-200 text-sm" 
      type="text" 
      value={line} 
      onChange={handleChange}
      placeholder="Linha de texto"
    />
  );
}