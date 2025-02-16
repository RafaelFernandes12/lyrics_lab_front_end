'use client'

import { get, put } from '@/services/axios'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { DrawerComponent } from '../components/DrawerComponent'
import { RenderText } from '../components/RenderText'
import { replaceChordsInLine } from '../utils/util'
import { regex } from '../utils/regex'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { TSong } from '@/models'
import { getToken } from '@/services/getToken'

export default function Song() {
  const { id } = useParams<{ id: string }>()
  const {
    data: song,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['song', id],
    queryFn: async () => {
      const token = (await getToken()) || ''
      return await get<TSong>(`song/${id}`, token)
    },
  })
  console.log(id)
  console.log(song)
  const [text, setText] = useState({
    name: '',
    tone: '',
    lyric: '',
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
        lyric: songLyric,
        bpm: song.bpm ? song.bpm : 0,
        compass: song.compass ? song.compass : '',
      })
    }
  }, [song, songLyric])

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

  async function handleToneChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { shift }),
    )

    const tone = replaceChordsInLine(songTone, chordType, { shift })

    const lyric = newLines.join('\n')
    const token = (await getToken()) || ''
    await put(`/song/${id}`, { id, lyric, tone }, token)
    refetch()
  }

  async function handleChangeChord() {
    const oppositeChordType =
      chordType === 'sharpChords' ? 'flatChords' : 'sharpChords'

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { oppositeChordType }),
    )

    const tone = replaceChordsInLine(songTone, chordType, {
      oppositeChordType,
    })

    const lyric = newLines.join('\n')
    const token = (await getToken()) || ''
    await put(`/song/${id}`, { id, lyric, tone }, token)
    refetch()
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
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
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
              lines={text.lyric}
              fontSize={textSize.fontSize}
              lineHeight={textSize.lineHeight}
              maxWidth={containerWidth}
            />
          </div>
        </div>
      )}
    </div>
  )
}
