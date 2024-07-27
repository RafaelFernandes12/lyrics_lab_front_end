'use client'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/urlIdProps'
import { editSong } from '@/operations/songRoutes/editSong'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
// eslint-disable-next-line prettier/prettier
import { editLyric } from '@/operations/songRoutes/editLyric'
import {
  chordRegex,
  lyrics,
  squareBracketContentRegex,
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

  function handleTomUp() {
    const newLines = lines.map((line) => {
      const words = line.split(' ')
      const isLineACipher = words.every(
        (word) =>
          word.match(chordRegex) ||
          word === '' ||
          word.match(squareBracketContentRegex),
      )
      return line.replace(tomUpAndDownRegex, (chord) => {
        const baseChord = chord.match(tomUpAndDownRegex)?.toString()
        if (baseChord && isLineACipher) {
          const index = lyrics.indexOf(baseChord)
          if (index !== -1) {
            const newChord = lyrics[(index + 1) % lyrics.length]
            return chord.replace(baseChord, newChord)
          }
        }
        return chord
      })
    })

    const newLyrics = newLines.join('\n')
    console.log(newLyrics)
    editLyric(params.id, newLyrics)
    setTimeout(() => {
      mutate({ name, lyric: newLyrics })
    }, 100)
  }
  function handleTomDown() {
    const newLines = lines.map((line) => {
      const words = line.split(' ')
      const isLineACipher = words.every(
        (word) =>
          word.match(chordRegex) ||
          word === '' ||
          word.match(squareBracketContentRegex),
      )
      return line.replace(tomUpAndDownRegex, (chord) => {
        const baseChord = chord.match(tomUpAndDownRegex)?.toString()
        if (baseChord && isLineACipher) {
          const index = lyrics.indexOf(baseChord)
          if (index !== -1) {
            const newChord = lyrics[(index - 1 + lyrics.length) % lyrics.length]
            return chord.replace(baseChord, newChord)
          }
        }
        return chord
      })
    })

    const newLyrics = newLines.join('\n')
    console.log(newLyrics)
    editLyric(params.id, newLyrics)
    setTimeout(() => {
      mutate({ name, lyric: newLyrics })
    }, 100)
  }
  const renderText = () => {
    return lines.map((line, index) => {
      const words = line.split(' ')
      const isLineACipher = words.every(
        (word) =>
          word.match(chordRegex) ||
          word === '' ||
          word.match(squareBracketContentRegex),
      )
      const isLineATibeLine = words.some((word) => word.match(tabLineRegex))
      return (
        <p
          key={index}
          className="line whitespace-pre-wrap break-words p-1 font-mono text-sm font-bold outline-none"
        >
          {words.map((word, index) => {
            return (
              <span
                key={index}
                className={`text ${
                  isLineACipher && !isLineATibeLine
                    ? ' text-cyan-500 dark:text-cyan-500'
                    : ''
                }`}
              >
                {word}{' '}
              </span>
            )
          })}
        </p>
      )
    })
  }

  return (
    <>
      <DrawerComponent tomUp={handleTomUp} tomDown={handleTomDown}>
        {' '}
        <div className="h-1/2 w-full">
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
                className="mt-10 h-full w-full resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none"
                placeholder="Comece aqui"
                spellCheck={false}
              />
            </>
          ) : (
            <div className="mt-10 h-full w-full">{renderText()}</div>
          )}
        </div>
      </DrawerComponent>
    </>
  )
}
