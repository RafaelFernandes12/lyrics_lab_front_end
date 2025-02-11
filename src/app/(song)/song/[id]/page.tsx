'use client'

import { urlIdProps } from '@/models'
import { put } from '@/services/axios'
import { fetcher } from '@/services/fetcher'
import EditIcon from '@mui/icons-material/Edit'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import useSWR from 'swr'
import { DrawerComponent } from '../components/DrawerComponent'
import { RenderText } from '../components/RenderText'
import { analyzeLine } from '../utils/analyzeLine'
import { regex } from '../utils/regex'

export default function Song({ params }: urlIdProps) {
  const id = params.id

  const { data: song, mutate } = useSWR(`/song/${id}`, fetcher)
  const [text, setText] = useState({
    name: '',
    tone: '',
    lyrics: '',
    bpm: 0,
    compass: '',
  })
  const [textSize, setTextSize] = useState({
    fontSize: 16,
    lineHeight: 1.1,
    index: 6,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(600)

  const songLyric: string = song?.lyric || ''
  const songTone: string = song?.tone || ''
  const lines: string[] = songLyric.split('\n') || []

  const chordTypeStorage = `chordType/song${id}/user${7}}`
  const chordType =
    (localStorage.getItem(chordTypeStorage) as keyof typeof regex.chordSets) ||
    'flatChords'

  useEffect(() => {
    if (song) {
      setText({
        name: song.name,
        tone: song.tone,
        lyrics: song.lyric,
        bpm: song.bpm,
        compass: song.compass,
      })
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

  const handlePrint = useReactToPrint({
    content: () => containerRef.current,
  })

  function replaceChordsInLine(
    line: string,
    type: keyof typeof regex.chordSets,
    options: {
      shift?: number
      oppositeChordType?: keyof typeof regex.chordSets
    },
  ): string {
    return line.replace(regex.chordRegex, (chord) => {
      let updatedChord = chord

      const { isThereAnAorAnEinTheLine } = analyzeLine(line)
      const baseChord = chord.match(regex.tomUpAndDownRegex)

      if (baseChord && !isThereAnAorAnEinTheLine) {
        baseChord.forEach((tone) => {
          const index = regex.chordSets[type].indexOf(tone)

          if (index !== -1) {
            let newChord: string
            if (options.shift)
              newChord =
                regex.chordSets[type][
                  (index + options.shift + regex.chordSets[type].length) %
                    regex.chordSets[type].length
                ]
            else if (options.oppositeChordType)
              newChord = regex.chordSets[options.oppositeChordType][index]
            else newChord = tone

            updatedChord = updatedChord.replace(tone, newChord)
          }
        })
      }
      return updatedChord
    })
  }

  async function handleToneChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { shift }),
    )

    const tone = replaceChordsInLine(songTone, chordType, { shift })

    const lyric = newLines.join('\n')
    const token = (await getCookie('jwt')) || ''
    await put(`/song/${id}`, { id, lyric, tone }, token)
    await mutate({ name: text.name, lyric, tone })
  }

  function handleTextChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1

    const newIndex =
      (textSize.index + shift + regex.textSizes.length) % regex.textSizes.length

    setTextSize({
      fontSize: regex.textSizes[newIndex][0],
      lineHeight: regex.textSizes[newIndex][1],
      index: newIndex,
    })
  }

  async function handleChangeChord() {
    const oppositeChordType =
      // eslint-disable-next-line eqeqeq
      chordType == 'sharpChords' ? 'flatChords' : 'sharpChords'

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { oppositeChordType }),
    )

    const tone = replaceChordsInLine(songTone, chordType, { oppositeChordType })

    const lyric = newLines.join('\n')
    const token = (await getCookie('jwt')) || ''
    await put(`/song/${id}`, { id, lyric, tone }, token)
    await mutate({ name: text.name, lyric })
  }

  return (
    <div className="flex justify-between max-lg:flex-col">
      <DrawerComponent
        toneUp={() => handleToneChange('up')}
        toneDown={() => handleToneChange('down')}
        pdfGenerator={handlePrint}
        textUp={() => handleTextChange('up')}
        textDown={() => handleTextChange('down')}
        flatChord={() => handleChangeChord()}
        sharpChord={() => handleChangeChord()}
        songId={id}
      />
      <div
        ref={containerRef}
        className="m-auto bg-white p-6 dark:bg-headerDark max-lg:w-full md:min-w-[800px]"
      >
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex justify-between">
            <h1>{song?.name}</h1>
            <Link href={`${id}/edit`}>
              <EditIcon />
            </Link>
          </div>
          <h3 className="text-base">
            Tom:{' '}
            <b className="text-blue-700 dark:text-blue-500">{song?.tone}</b>
          </h3>
          {song?.compass && (
            <span className="whitespace-pre-wrap">
              Compasso: {song?.compass}
            </span>
          )}
          {song?.bpm && (
            <span className="whitespace-pre-wrap">Bpm: {song?.bpm}</span>
          )}
        </div>
        <div className="mt-10">
          <RenderText
            lines={text.lyrics}
            fontSize={textSize.fontSize}
            lineHeight={textSize.lineHeight}
            maxWidth={containerWidth}
          />
        </div>
      </div>
    </div>
  )
}
