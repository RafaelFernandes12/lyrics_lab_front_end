'use client'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { editSong } from '@/operations/songRoutes/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
// eslint-disable-next-line prettier/prettier
import { editLyric } from '@/operations/songRoutes/editLyric'
import { useReactToPrint } from 'react-to-print'
// eslint-disable-next-line prettier/prettier
import {
  chordRegex,
  lyrics,
  matchAorERegex,
  noChordRegex,
  tabLineRegex,
  tomUpAndDownRegex,
} from '../components/regex'
import { renderText } from '../components/renderText'
interface textEditorProps {
  name?: string
  lyric: string
}

export default function Song({ params }: urlIdProps) {
  const [isChecked, setIsChecked] = useState(true)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const { data: song, mutate } = useSWR<textEditorProps>(
    `/song/${params.id}`,
    fetcher,
  )
  const songLyric = song?.lyric || ''
  const lines = songLyric.split('\n')
  useEffect(() => {
    if (song) {
      setName(song.name || '')
      setText(song.lyric)
    }
  }, [song])

  const handleToggle = useCallback(() => {
    setIsChecked((prev) => !prev)
    editSong(params.id, name, text)
    setTimeout(() => {
      mutate({ name, lyric: text })
    }, 500)
  }, [name, text, params.id, mutate])

  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  function handleTomUp() {
    const newLines = lines.map((line) => {
      // const words = line.split(' ')
      // const isThereAnAOrAnE = words.some((word) => word === 'A' || word === 'E')

      return line.replace(chordRegex, (chord) => {
        const matchAorE = matchAorERegex.test(line)
        const matchNoChord = noChordRegex.test(line)
        const isThereAnAorAnEinTheLine = !!(matchAorE && matchNoChord)
        let updatedChord = chord
        const baseChord = chord.match(tomUpAndDownRegex)
        if (baseChord && !isThereAnAorAnEinTheLine) {
          baseChord.forEach((cipher) => {
            const index = lyrics.indexOf(cipher)
            if (index !== -1) {
              const newChord = lyrics[(index + 1) % lyrics.length]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })

    const newLyrics = newLines.join('\n')
    editLyric(params.id, newLyrics)
    setTimeout(() => {
      mutate({ name, lyric: newLyrics })
    }, 100)
  }
  function handleTomDown() {
    const newLines = lines.map((line) => {
      return line.replace(chordRegex, (chord) => {
        let updatedChord = chord
        const baseChord = chord.match(tomUpAndDownRegex)

        if (baseChord) {
          baseChord.forEach((cipher) => {
            const index = lyrics.indexOf(cipher)
            if (index !== -1) {
              const newChord =
                lyrics[(index - 1 + lyrics.length) % lyrics.length]
              updatedChord = updatedChord.replace(cipher, newChord)
            }
          })
        }
        return updatedChord
      })
    })

    const newLyrics = newLines.join('\n')
    editLyric(params.id, newLyrics)
    setTimeout(() => {
      mutate({ name, lyric: newLyrics })
    }, 100)
  }

  return (
    <div className="flex gap-[5%] max-md:flex-col">
      <DrawerComponent
        toneUp={handleTomUp}
        toneDown={handleTomDown}
        pdfGenerator={handlePrint}
      />{' '}
      <div className="w-full">
        {isChecked ? (
          <input
            className="text-2xl font-semibold"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        ) : (
          <h1 className="text-2xl font-semibold">{song?.name}</h1>
        )}
        <h3 className="text-base">Tom: Cm7</h3>
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
          <div className="pdfChord mt-10" ref={componentRef}>
            {renderText({
              lines,
              chordRegex,
              noChordRegex,
              tabLineRegex,
              matchAorERegex,
            })}
          </div>
        )}
      </div>
    </div>
  )
}
