'use client'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { clientEditLyric } from '@/operations/songs/client-side/editLyric'
import { clientEditSong } from '@/operations/songs/client-side/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import nookies from 'nookies'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
import { RenderText } from '../components/RenderText'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

export default function Song({ params }: urlIdProps) {
  const [isChecked, setIsChecked] = useState(true)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [textSize, setTextSize] = useState(16)
  const preRef = useRef<HTMLPreElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const { data: song, mutate } = useSWR(`/song/${params.id}`, fetcher)

  const songLyric: string = song?.lyric || ''
  const lines = songLyric.split('\n')

  useEffect(() => {
    if (song) {
      setName(song.name || '')
      setText(song.lyric || '')
    }
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
    await clientEditSong({ id: params.id, name, lyric: text })
    await mutate({ name, lyric: text })
  }, [params.id, name, text, mutate])

  const handlePrint = useReactToPrint({
    content: () => preRef.current,
  })

  async function handleToneChange(direction: 'up' | 'down') {
    const cookies = nookies.get(null)
    const chordType = cookies.chordType
    console.log(chordType)
    const newLines = lines.map((line) => {
      return line.replace(regex.chordRegex, (chord) => {
        let updatedChord = chord

        const { isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)

        const baseChord = chord.match(regex.tomUpAndDownRegex)

        if (baseChord && !isThereAnAorAnEinTheLine && !isLineATabLine) {
          baseChord.forEach((cipher) => {
            const index = regex.chordSets.sharpChords.indexOf(cipher)
            if (index !== -1) {
              const shift = direction === 'up' ? 1 : -1
              const newChord =
                regex.chordSets.sharpChords[
                  (index + shift + regex.chordSets.sharpChords.length) %
                    regex.chordSets.sharpChords.length
                ]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })

    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics })
    await mutate({ name, lyric: newLyrics })
  }

  function handleTextChange(direction: 'up' | 'down') {
    const index = regex.textSizes.indexOf(textSize)
    const shift = direction === 'up' ? 1 : -1
    const newIndex =
      (index + shift + regex.textSizes.length) % regex.textSizes.length
    setTextSize(regex.textSizes[newIndex])
  }
  async function handleChangeChord(chordType: 'flatChords' | 'sharpChords') {
    nookies.set(null, 'chordType', chordType)
    let oppositeChordType = chordType
    if (chordType === 'sharpChords') oppositeChordType = 'flatChords'
    if (chordType === 'flatChords') oppositeChordType = 'sharpChords'
    const newLines = lines.map((line) => {
      return line.replace(regex.chordRegex, (chord) => {
        let updatedChord = chord

        const { isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)
        const baseChord = chord.match(regex.tomUpAndDownRegex)

        if (baseChord && !isThereAnAorAnEinTheLine && !isLineATabLine) {
          baseChord.forEach((cipher) => {
            const index = regex.chordSets[chordType].indexOf(cipher)
            console.log(cipher + index)
            if (index !== -1) {
              const newChord = regex.chordSets[oppositeChordType][index]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })

    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics })
    await mutate({ name, lyric: newLyrics })
  }

  return (
    <div className="flex justify-between">
      <DrawerComponent
        toneUp={() => handleToneChange('up')}
        toneDown={() => handleToneChange('down')}
        pdfGenerator={handlePrint}
        textUp={() => handleTextChange('up')}
        textDown={() => handleTextChange('down')}
        flatChord={() => handleChangeChord('flatChords')}
        sharpChord={() => handleChangeChord('sharpChords')}
      />
      <div
        ref={containerRef}
        className="m-auto bg-white p-6 dark:bg-black xl:min-w-[800px]"
      >
        {isChecked ? (
          <input
            className="bg-slate-100 p-2 text-3xl"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        ) : (
          <h1>{song?.name}</h1>
        )}
        <h3 className="text-base">Tom: {song?.tone}</h3>
        <FormGroup>
          <FormControlLabel
            onClick={handleToggle}
            control={<Switch defaultChecked />}
            label="Edição"
          />
        </FormGroup>

        <p>{containerWidth}px</p>
        {isChecked ? (
          <>
            <textarea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setText(e.target.value)
              }}
              value={text}
              className="mt-10 h-[1200px] w-full resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none max-sm:w-full"
              placeholder="Comece aqui"
              spellCheck={false}
            />
          </>
        ) : (
          <pre className="mt-10" ref={preRef}>
            <RenderText
              lines={text}
              fontSize={textSize}
              maxWidth={containerWidth}
            />
          </pre>
        )}
      </div>
    </div>
  )
}
