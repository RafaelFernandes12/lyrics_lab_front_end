import { useState } from 'react';

export default function TextLine() {
  const[line, setLine] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value);
  }

  return(
    <input 
      className="bg-transparent w-[290px] mb-3 outline-none text-sm font-mono" 
      type="text" 
      maxLength={36}
      value={line} 
      onChange={handleChange}
      placeholder="Linha de texto"
    />
  );
}