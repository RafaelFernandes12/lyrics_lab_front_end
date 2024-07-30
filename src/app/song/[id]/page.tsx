'use client'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { editSong } from '@/operations/songRoutes/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
// eslint-disable-next-line prettier/prettier
import { editLyric } from '@/operations/songRoutes/editLyric'
import { useReactToPrint } from 'react-to-print'
// eslint-disable-next-line prettier/prettier
import {
  chordRegex,
  letterWithSharp,
  lyrics,
  noChordRegex,
  tabLineRegex,
  tomUpAndDownRegex,
} from '../components/regex'
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

  const handleToggle = () => {
    setIsChecked(!isChecked)
    editSong(6, name, text)
    setTimeout(() => {
      mutate({ name, lyric: text })
    }, 500)
  }
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  function handleTomUp() {
    const newLines = lines.map((line) => {
      const isThereAnAorAnEinTheLine =
        /(?!\/#)\b[AE]\b(?!#)(?!\/)/g.test(line) && noChordRegex.test(line)
      return line.replace(chordRegex, (chord) => {
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

  const renderText = () => {
    return lines.map((line, index) => {
      const words = line.split(' ')
      const isLineATibeLine = words.some((word) => word.match(tabLineRegex))

      const isThereAnAorAnEinTheLine =
        /(?!\/#)\b[AE]\b(?!#)(?!\/)/g.test(line) &&
        noChordRegex.test(line) &&
        letterWithSharp.test(line)

      return (
        <p
          key={index}
          className="whitespace-pre-wrap font-mono text-sm font-bold outline-none max-sm:text-xs"
        >
          {words.map((word, index) => {
            if (
              word.match(chordRegex) &&
              !isLineATibeLine &&
              !isThereAnAorAnEinTheLine
            ) {
              return (
                <b key={index} className=" text-blue-500 dark:text-blue-500">
                  {word}{' '}
                </b>
              )
            }
            return <>{word} </>
          })}
        </p>
      )
    })
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
            {renderText()}
          </div>
        )}
      </div>
    </div>
  )
}
