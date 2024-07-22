/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
'use client'

import Chord from './Chord'
import TextLine from './TextLine'

export default function Board() {
  return (
    <div>
      <div className="flex w-[280px] justify-between">
        {[...Array(10)].map((item, index) => (
          <Chord />
        ))}
      </div>
      <TextLine />
    </div>
  )
}
