'use client'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { editLyric } from '@/operations/songRoutes/editLyric'
import { editSong } from '@/operations/songRoutes/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { parseCookies } from 'nookies'
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

  const cookies = parseCookies()
  const token = cookies.lltoken

  const { data: song, mutate } = useSWR(
    [`/song/${params.id}`, token],
    ([url, token]) => fetcher(url, token),
  )

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
    await editSong(params.id, name, text, token)
    await mutate({ name, lyric: text })
  }, [params.id, name, text, token, mutate])

  const handlePrint = useReactToPrint({
    content: () => preRef.current,
  })

  async function handleTomChange(direction: 'up' | 'down') {
    const newLines = lines.map((line) => {
      return line.replace(regex.chordRegex, (chord) => {
        let updatedChord = chord

        const { isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)

        const baseChord = chord.match(regex.tomUpAndDownRegex)

        if (baseChord && !isThereAnAorAnEinTheLine && !isLineATabLine) {
          baseChord.forEach((cipher) => {
            const index = regex.lyrics.indexOf(cipher)
            if (index !== -1) {
              const shift = direction === 'up' ? 1 : -1
              const newChord =
                regex.lyrics[
                  (index + shift + regex.lyrics.length) % regex.lyrics.length
                ]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })

    const newLyrics = newLines.join('\n')
    await editLyric(params.id, newLyrics, token)
    await mutate({ name, lyric: newLyrics })
  }

  function handleTextChange(direction: 'up' | 'down') {
    const index = regex.textSizes.indexOf(textSize)
    const shift = direction === 'up' ? 1 : -1
    const newIndex =
      (index + shift + regex.textSizes.length) % regex.textSizes.length
    setTextSize(regex.textSizes[newIndex])
  }

  return (
    <div className="flex gap-[5%] max-md:flex-col">
      <DrawerComponent
        toneUp={() => handleTomChange('up')}
        toneDown={() => handleTomChange('down')}
        pdfGenerator={handlePrint}
        textUp={() => handleTextChange('up')}
        textDown={() => handleTextChange('down')}
      />
      <div ref={containerRef} className="max-w-[800px]">
        {isChecked ? (
          <input
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
              className="mt-10 h-[1200px] w-[600px] resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none max-sm:w-full"
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
