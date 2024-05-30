'use client';

import Chord from './Chord';
import TextLine from './TextLine';

export default function Board() {
  return(
    <div>
      <div className="w-[280px] flex justify-between">
        {[...Array(10)].map((item, index) => (
          <Chord />
        ))}
      </div>
      <TextLine />
    </div>
  );
}
