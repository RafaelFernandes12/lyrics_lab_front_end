'use client';

import ChordLine from './ChordLine';
import TextLine from './TextLine';

export default function Board() {
  return(
    <div className='flex flex-col'>
      <ChordLine/>
      <TextLine />
    </div>
  );
}
