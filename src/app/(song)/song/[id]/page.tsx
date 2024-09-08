'use client'

import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { clientEditLyric } from '@/operations/songs/client-side/editLyric'
import { clientEditSong } from '@/operations/songs/client-side/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
import { RenderText } from '../components/RenderText'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

export default function Song({ params }: urlIdProps) {

  const { data: song, mutate } = useSWR(`/song/${params.id}`, fetcher)

  const [isChecked, setIsChecked] = useState(false)
  const [text, setText] = useState({
    name: '',
    tone: '',
    lyrics: ''
})
  const [textSizeIndex, setTextSizeIndex] = useState(6)
  const [textSize, setTextSize] = useState({
    fontSize: 16,
    lineHeight: 1.1,
  })
  const preRef = useRef<HTMLPreElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const songLyric: string = song?.lyric || ''
  const songTone: string = song?.tone || ''
  const lines = songLyric.split('\n')

  useEffect(() => {
    if (song) {
      setText({
        name: song.name,
        tone: song.tone,
        lyrics: song.lyric,
      })
    }
    console.log('aqui')
  }, [song])
  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width)
        }
      })
      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  const handleToggle = useCallback(async () => {
    setIsChecked((prev) => !prev)
    await clientEditSong({ id: params.id, name: text.name, lyric: text.lyrics, tone:text.tone })
    await mutate({ name: text.name, lyric: text.lyrics, tone:text.tone })
  }, [params.id, text, mutate])

  const handlePrint = useReactToPrint({
    content: () => containerRef.current,
  })
  const chordTypeStorage = `chordType/song${params.id}/user${7}}`
  const chordType =
    (localStorage.getItem(chordTypeStorage) as keyof typeof regex.chordSets) ||
    'flatChords'
  async function handleToneChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1
    const newLines = lines.map((line) => {
      return line.replace(regex.chordRegex, (chord) => {
        let updatedChord = chord

        const { isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)

        const baseChord = chord.match(regex.tomUpAndDownRegex)

        if (baseChord && !isThereAnAorAnEinTheLine && !isLineATabLine) {
          baseChord.forEach((cipher) => {
            const index = regex.chordSets[chordType].indexOf(cipher)
            if (index !== -1) {
              const newChord =
                regex.chordSets[chordType][
                  (index + shift + regex.chordSets[chordType].length) %
                    regex.chordSets[chordType].length
                ]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })
    const newTone = songTone.replace(regex.tomUpAndDownRegex, (tone) => {
      const index = regex.chordSets[chordType].indexOf(tone)
      const newTone =
        regex.chordSets[chordType][
          (index + shift + regex.chordSets[chordType].length) %
            regex.chordSets[chordType].length
        ]
      return newTone
    })
    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics, tone: newTone })
    await mutate({ name: text.name, lyric: newLyrics, tone: newTone })
  }

  function handleTextChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1
    const newIndex =
      (textSizeIndex + shift + regex.textSizes.length) % regex.textSizes.length
    setTextSizeIndex(newIndex)
    console.log(textSize)
    setTextSize({
      fontSize: regex.textSizes[newIndex][0],
      lineHeight: regex.textSizes[newIndex][1],
    })
  }

  async function handleChangeChord() {
    let oppositeChordType = chordType

    if (chordType === 'sharpChords') {
      oppositeChordType = 'flatChords'
    }
    if (chordType === 'flatChords') {
      oppositeChordType = 'sharpChords'
    }
    const newLines = lines.map((line) => {
      return line.replace(regex.chordRegex, (chord) => {
        let updatedChord = chord

        const { isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)
        const baseChord = chord.match(regex.tomUpAndDownRegex)

        if (baseChord && !isThereAnAorAnEinTheLine && !isLineATabLine) {
          baseChord.forEach((cipher) => {
            const index = regex.chordSets[chordType].indexOf(cipher)
            if (index !== -1) {
              const newChord = regex.chordSets[oppositeChordType][index]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })
    const newTone = songTone.replace(regex.tomUpAndDownRegex, (tone) => {
      const index = regex.chordSets[chordType].indexOf(tone)
      let newTone = tone
      if (index !== -1) newTone = regex.chordSets[oppositeChordType][index]
      return newTone
    })

    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics, tone: newTone })
    await mutate({ name: text.name, lyric: newLyrics })
  }

  return (
    <div className="flex justify-between">
      <DrawerComponent
        toneUp={() => handleToneChange('up')}
        toneDown={() => handleToneChange('down')}
        pdfGenerator={handlePrint}
        textUp={() => handleTextChange('up')}
        textDown={() => handleTextChange('down')}
        flatChord={() => handleChangeChord()}
        sharpChord={() => handleChangeChord()}
        songId={params.id}
      />
      <div
        ref={containerRef}
        className="m-auto bg-white p-6 dark:bg-headerDark md:min-w-[800px]"
      >
        {isChecked ? (
          <div className="flex flex-col gap-2">
            <input
              className="bg-slate-100 p-2 text-3xl"
              value={text.name}
                onChange={(e) => {
                    setText((prev) => ({
                        ...prev,
                        name: e.target.value,
                    })
                    )
                }}
            />
            <div>
              <span>Tom: </span>
              <input
                className="bg-slate-100 p-1 text-xl"
                value={text.tone}
                onChange={(e) => {
                    setText((prev) => ({
                        ...prev,
                        tone: e.target.value,
                        })
                    )
                  }}
              />
            </div>
          </div>
        ) : (
          <>
            <h1>{song?.name}</h1>
            <h3 className="text-base">
              Tom:{' '}
              <b className="text-blue-700 dark:text-blue-500">{song?.tone}</b>
            </h3>
          </>
        )}
        <FormGroup>
          <FormControlLabel
            onClick={handleToggle}
            control={<Switch defaultChecked />}
            label="Edição"
          />
        </FormGroup>

        {isChecked ? (
          <>
            <textarea
              onChange={(e) => {
                setText((prev) => ({
                    ...prev,
                    lyrics: e.target.value,
                    })
                )
              }}
              value={text.lyrics}
              className="mt-10 h-[1200px] w-full resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none max-sm:w-full"
              placeholder="Comece aqui"
              spellCheck={false}
            />
          </>
        ) : (
          <pre className="mt-10" ref={preRef}>
            <RenderText
              lines={text.lyrics}
              fontSize={textSize.fontSize}
              lineHeight={textSize.lineHeight}
              maxWidth={containerWidth}
            />
          </pre>
        )}
      </div>
    </div>
  )
}
