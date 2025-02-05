'use client'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import { analyzeLine } from "../utils/analyzeLine";
import { regex } from '../utils/regex'

export default function Song({ params }: urlIdProps) {
  const { data: song, mutate } = useSWR(`/song/${params.id}`, fetcher)

  const [isChecked, setIsChecked] = useState(false)
  const [text, setText] = useState({
    name: '',
    tone: 'Comece aqui',
    lyrics: '',
    bpm: 0,
    compass: '',
  })
  const [textSizeIndex, setTextSizeIndex] = useState(6)
  const [textSize, setTextSize] = useState({
    fontSize: 16,
    lineHeight: 1.1,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(600)

  const songTone: string = song?.tone || ''
  const lines: string[] = song?.lyric.split('\n') || []

  const chordTypeStorage = `chordType/song${params.id}/user${7}}`
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

  const handleToggle = useCallback(async () => {
    setIsChecked((prev) => !prev)
    await clientEditSong({
      id: params.id,
      name: text.name,
      lyric: text.lyrics,
      tone: text.tone,
      bpm: text.bpm,
      compass: text.compass,
    })
    await mutate({ name: text.name, lyric: text.lyrics, tone: text.tone })
  }, [params.id, text, mutate])

  const handlePrint = useReactToPrint({
    content: () => containerRef.current,
  })

  function replaceChordsInLine(
    line: string,
    type: keyof typeof regex.chordSets,
    options: {
      shift?: number;
      oppositeChordType?: keyof typeof regex.chordSets;
    }
  ): string {
    return line.replace(regex.chordRegex, (chord) => {
      let updatedChord = chord;

      const { isThereAnAorAnEinTheLine } = analyzeLine(line);
      const baseChord = chord.match(regex.tomUpAndDownRegex);

      if (baseChord && !isThereAnAorAnEinTheLine) {
        baseChord.forEach((tone) => {

          const index = regex.chordSets[type].indexOf(tone);

          if (index !== -1) {
            let newChord: string;
            if (options.shift)
              newChord =
                regex.chordSets[type][
                (index + options.shift + regex.chordSets[type].length) %
                regex.chordSets[type].length
                ];
            else if (options.oppositeChordType) newChord = regex.chordSets[options.oppositeChordType][index];
            else newChord = tone;

            updatedChord = updatedChord.replace(tone, newChord);
          }
        });
      }
      return updatedChord;
    });
  }

  async function handleToneChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { shift })
    );

    const newTone = replaceChordsInLine(songTone, chordType, { shift });

    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics, tone: newTone })
    await mutate({ name: text.name, lyric: newLyrics, tone: newTone })
  }

  function handleTextChange(direction: 'up' | 'down') {
    const shift = direction === 'up' ? 1 : -1

    const newIndex =
      (textSizeIndex + shift + regex.textSizes.length) % regex.textSizes.length

    setTextSizeIndex(newIndex)
    setTextSize({
      fontSize: regex.textSizes[newIndex][0],
      lineHeight: regex.textSizes[newIndex][1],
    })
  }

  async function handleChangeChord() {
    const oppositeChordType = chordType == 'sharpChords' ? 'flatChords' : 'sharpChords'

    const newLines = lines.map((line) =>
      replaceChordsInLine(line, chordType, { oppositeChordType })
    );

    const newTone = replaceChordsInLine(songTone, chordType, { oppositeChordType });

    const newLyrics = newLines.join('\n')
    await clientEditLyric({ id: params.id, lyric: newLyrics, tone: newTone })
    await mutate({ name: text.name, lyric: newLyrics })
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
        songId={params.id}
      />
      <div
        ref={containerRef}
        className="m-auto bg-white p-6 dark:bg-headerDark max-lg:w-full md:min-w-[800px]"
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
                }))
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
                  }))
                }}
              />
            </div>
            <div className="flex gap-4">
              <span>Bpm: </span>
              <input
                className="w-20 bg-slate-100 p-1"
                value={text.bpm}
                onChange={(e) => {
                  setText((prev) => ({
                    ...prev,
                    bpm: parseInt(e.target.value),
                  }))
                }}
              />
              <span>Compasso: </span>
              <input
                className="w-20 bg-slate-100 p-1"
                value={text.compass}
                onChange={(e) => {
                  setText((prev) => ({
                    ...prev,
                    compass: e.target.value,
                  }))
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-2 flex flex-col gap-2">
            <h1>{song?.name}</h1>
            <h3 className="text-base">
              Tom:{' '}
              <b className="text-blue-700 dark:text-blue-500">{song?.tone}</b>
            </h3>
            <span
              className={`whitespace-pre-wrap ${!song?.compass && !song?.bpm ? 'hidden' : ''}`}
            >
              Compasso: {song?.compass} BPM: {song?.bpm}
            </span>
          </div>
        )}
        <FormGroup>
          <FormControlLabel
            onClick={handleToggle}
            control={<Switch />}
            label="Edição"
          />
        </FormGroup>

        {isChecked ? (
          <>
            {/* <ReactQuill value={text.lyrics} */}
            {/*   onChange={(lyrics) => { */}
            {/*     setText((prev) => ({ */}
            {/*       ...prev, */}
            {/*       lyrics */}
            {/*     })) */}
            {/**/}
            {/*   }} */}
            {/*   placeholder="Comece aqui" */}
            {/* /> */}
            <textarea
              onChange={(e) => {
                setText((prev) => ({
                  ...prev,
                  lyrics: e.target.value,
                }))
              }}
              value={text.lyrics}
              className="mt-10 h-[1200px] w-full resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none max-sm:w-full"
              placeholder="Comece aqui"
              spellCheck={false}
            />
          </>
        ) : (
          <div className="mt-10">
            <RenderText
              lines={text.lyrics}
              fontSize={textSize.fontSize}
              lineHeight={textSize.lineHeight}
              maxWidth={containerWidth}
            />
          </div>
        )}
      </div>
    </div>
  )
}
