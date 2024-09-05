'use client'
import { analyzeLine } from '../utils/lineUtils'
import { Paragraph, Words } from './Text'

interface renderTextProps {
  lines: string
  fontSize: number
  maxWidth: number
}

export function RenderText({ lines, fontSize, maxWidth }: renderTextProps) {
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
    const lines = text.split('\n')
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
    const { isLineInsideSymbols, wordInsideSymbols } = analyzeLine(
      fittingParagraphs[i],
    )
    if (isLineInsideSymbols) {
      let div: JSX.Element = <div></div>
      const groupedParagraphs: string[] = []
      while (fittingParagraphs[i] !== ' ' && fittingParagraphs[i]) {
        groupedParagraphs.push(fittingParagraphs[i])
        i++
      }
      const noTitleGroup = groupedParagraphs.filter(
        (p) => p !== groupedParagraphs[0],
      )
      div = (
        <div className="rounded-xl bg-black/10 dark:bg-white/10">
          <Paragraph
            fontSize={fontSize}
            key={i}
            line={fittingParagraphs[i]}
            className="rounded-t-xl bg-slate-600 py-1 text-center text-white"
          >
            <Words line={wordInsideSymbols} />
          </Paragraph>
          <pre className="p-3">
            {noTitleGroup.map((line, i) => {
              return (
                <Paragraph
                  fontSize={fontSize}
                  key={i}
                  className="text-black"
                  line={line}
                >
                  <Words line={line} />
                </Paragraph>
              )
            })}
          </pre>
        </div>
      )
      template.push(div)
      template.push(<p> </p>)
    } else {
      const p = (
        <Paragraph fontSize={fontSize} line={fittingParagraphs[i]}>
          <Words line={fittingParagraphs[i]} />
        </Paragraph>
      )
      template.push(p)
    }
  }
  return <>{template.map((a) => a)}</>
}
