import React from 'react'
import { analyzeLine } from '../utils/util'
import { regex } from '../utils/regex'

interface renderTextProps {
  lines: string
  fontSize: number
  lineHeight: number
  maxWidth: number
}

export function RenderText({
  lines,
  fontSize,
  lineHeight,
  maxWidth,
}: renderTextProps) {
  function breakTextIntoLines(text: string, maxCharsPerLine: number) {
    const lines = []
    let start = 0

    while (start < text.length) {
      let end = start + maxCharsPerLine

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

  function getTextWithinWidth(text: string, maxWidth: number) {
    const lines = text ? text.split('\n') : []
    const fittingText: string[] = []
    const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6))

    for (let i = 0; i < lines.length; i++) {
      const { isLineAChordLine: ILine1, isLineEmpty: IEmpty1 } =
        analyzeLine(lines[i]) || 'aiyfwdauyfdwiu7atdfi'

      const { isLineAChordLine: ILine2, isLineEmpty: IEmpty2 } =
        analyzeLine(lines[i + 1]) || 'iadgwiaygdioawda'

      if (ILine1 && !ILine2 && !IEmpty1 && !IEmpty2) {
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

  const paragraphs: JSX.Element[][] = []
  const test: JSX.Element[][] = []

  const teste = fittingParagraphs.map((line) => {
    let newLine = line
    const { isThereAnAorAnEinTheLine } = analyzeLine(line)

    newLine = newLine.replace(
      regex.bold,
      (t) => `<strong>${t.replace(/\*/g, '')}</strong>`,
    )
    newLine = newLine.replace(
      regex.italic,
      (t) => `<em>${t.replace(/_/g, '')}</em>`,
    )
    newLine = newLine.replace(
      regex.underline,
      (t) => `<u>${t.replace(/~/g, '')}</u>`,
    )
    newLine = newLine.replace(regex.chordRegex, (t) => {
      const isChord = t.match(regex.chordRegex) && !isThereAnAorAnEinTheLine
      if (isChord)
        return `<b class="font-semibold text-blue-700 dark:text-blue-500">${t}</b>`
      return t
    })

    return newLine
  })
  console.log(teste)

  fittingParagraphs.forEach((line) => {
    const words = line.split(' ')
    const { isThereAnAorAnEinTheLine } = analyzeLine(line)
    const paragraph: JSX.Element[] = []

    for (const word of words) {
      const { bold, italic, underline } = analyzeLine(word)

      const cleanedWord = word
        .replace(/\*/g, '')
        .replace(/_/g, '')
        .replace(/~/g, '')

      let styledWord: JSX.Element = <>{cleanedWord}</>

      if (underline) styledWord = <u>{styledWord}</u>
      if (italic) styledWord = <em>{styledWord}</em>
      if (bold) styledWord = <strong>{styledWord}</strong>

      const isChord = word.match(regex.chordRegex) && !isThereAnAorAnEinTheLine
      if (isChord) {
        styledWord = (
          <b className="font-semibold text-blue-700 dark:text-blue-500">
            {styledWord}{' '}
          </b>
        )
      }

      paragraph.push(styledWord)
    }

    paragraphs.push(paragraph)
  })

  return (
    <>
      {teste.map((text, index) => (
        <div
          key={index}
          className="whitespace-pre-wrap font-mono"
          style={{ fontSize, lineHeight }}
        >
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ))}
    </>
  )
}
