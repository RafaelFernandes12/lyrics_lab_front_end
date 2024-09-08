import { Fragment } from 'react'
import { analyzeLine } from '../utils/lineUtils'
import { Italic, Paragraph, Strong, Words } from './Text'

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

  const template: JSX.Element[] = []
  for (let i = 0; i < fittingParagraphs.length; i++) {
    const regex = /(\*_([^*_]+)_\*)|(\*[^*_]+\*)|(_[^*_]+_)|([^*_]+)/g

    const parseText = () => {
      const matches = fittingParagraphs[i]?.match(regex) || []

      return matches.map((part, index) => {
        if (part.startsWith('*_') && part.endsWith('_*')) {
          return (
            <i key={index}>
              <Strong
                fontSize={fontSize}
                lineHeight={lineHeight}
                line={part.slice(2, -2)}
              />
            </i>
          )
        } else if (part.startsWith('_') && part.endsWith('_')) {
          return (
            <Strong
              key={index}
              fontSize={fontSize}
              lineHeight={lineHeight}
              line={part.slice(1, -1)}
            />
          )
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <Italic
              key={index}
              fontSize={fontSize}
              lineHeight={lineHeight}
              line={part.slice(1, -1)}
            />
          )
        } else {
          return <Words line={part} key={index} />
        }
      })
    }
    const content = (
      <Paragraph fontSize={fontSize} lineHeight={lineHeight}>
        {parseText().map((a) => a)}
      </Paragraph>
    )
    template.push(content)
  }

  return (
    <>
      {template.map((a, i) => (
        <Fragment key={i}>{a}</Fragment>
      ))}
    </>
  )
}
