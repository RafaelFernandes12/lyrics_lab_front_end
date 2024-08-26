// RenderText.tsx
'use client'
import { regex } from '@/utils/regex'
import { useRef } from 'react'
import { analyzeLine } from '../../../utils/lineUtils'

interface renderTextProps {
  lines: string
  fontSize: string
  maxWidth: number
}

export function RenderText({ lines, fontSize, maxWidth }: renderTextProps) {
  const textSize = useRef<HTMLParagraphElement>(null)
  function breakTextIntoLines(text: string, maxCharsPerLine: number) {
    const lines = []
    let start = 0

    while (start < text.length) {
      let end = start + maxCharsPerLine

      // Ensure end does not exceed text length
      if (end >= text.length) {
        lines.push(text.slice(start))
        break
      }

      while (end > start && text[end] !== ' ') {
        end--
      }

      if (end === start) {
        end = start + maxCharsPerLine
        while (end < text.length && text[end] !== ' ') {
          end++
        }
      }

      lines.push(text.slice(start, end + 1))
      start = end + 1
    }

    return lines
  }
  const font = parseInt(window.getComputedStyle(textSize.current!).fontSize)

  function getTextWithinWidth(text: string, maxWidth: number) {
    const lines = text.split('\n')
    const fittingText: string[] = []
    const maxCharsPerLine = Math.floor(maxWidth / (font * 0.6))

    for (let i = 0; i < lines.length; i++) {
      const {
        isLineAChordLine: ILine1,
        isLineEmpty: IEmpty1,
        isLineATabLine: ITabLine1,
      } = analyzeLine(lines[i]) || 'aiyfwdauyfdwiu7atdfi'
      const {
        isLineAChordLine: ILine2,
        isLineEmpty: IEmpty2,
        isLineATabLine: ITabLine2,
      } = analyzeLine(lines[i + 1]) || 'iadgwiaygdioawda'
      const parameters =
        ILine1 && !ILine2 && !IEmpty1 && !IEmpty2 && !ITabLine1 && !ITabLine2
      if (parameters) {
        let midPoint = 0
        const lineWithChords: string[] = []
        const updatedChars: string[] = []
        for (let j = i; j < i + 2; j++) {
          updatedChars.push(...breakTextIntoLines(lines[j], maxCharsPerLine))
          if (j === i) midPoint = updatedChars.length
        }
        for (let k = 0; k < midPoint; k++) {
          lineWithChords.push(updatedChars[k])
          lineWithChords.push(updatedChars[k + midPoint])
        }
        fittingText.push(...lineWithChords)
        if (lineWithChords.length < updatedChars.length) {
          const leftWords = updatedChars.filter(
            (chord) => !lineWithChords.includes(chord),
          )
          fittingText.push(...leftWords)
        }

        i++
      } else {
        if (lines[i] === '') {
          lines[i] = ' '
          fittingText.push(lines[i])
        } else
          fittingText.push(...breakTextIntoLines(lines[i], maxCharsPerLine))
      }
    }
    return fittingText
  }
  const fittingParagraphs =
    maxWidth > 0 ? getTextWithinWidth(lines, maxWidth) : []
  return (
    <>
      {fittingParagraphs.map((line, index) => {
        const { words, isLineATabLine, isThereAnAorAnEinTheLine } =
          analyzeLine(line)
        const isLineEmpty = line ? line.trim() === '' : false
        if (isLineEmpty) {
          return <p key={index}>&nbsp;</p>
        }
        return (
          <p
            key={index}
            ref={textSize}
            className="whitespace-pre-wrap font-mono"
            style={{ fontSize }}
          >
            {words.map((word, index) => {
              const isChord =
                word.match(regex.chordRegex) &&
                !isLineATabLine &&
                !isThereAnAorAnEinTheLine
              return (
                <span
                  key={index}
                  className={`${isChord ? 'font-semibold text-blue-500 dark:text-blue-500' : ''}`}
                >
                  {word}{' '}
                </span>
              )
            })}
          </p>
        )
      })}
    </>
  )
}
