'use client';

import { useState } from 'react';

export default function TextLine() {
  const[line, setLine] = useState('');

  function handleChange(evento: React.ChangeEvent<HTMLInputElement>) {
    setLine(evento.target.value);
  }

  return(
    <input 
      className="bg-transparent p-1 w-2/5" 
      type="text" 
      value={line} 
      onChange={handleChange}
      placeholder="Linha de texto"
    />
  );
}