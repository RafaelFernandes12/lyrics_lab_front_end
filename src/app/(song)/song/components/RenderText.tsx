<<<<<<< HEAD
import { regex } from '../utils/regex'
import { analyzeLine, modifyLines /* modifyLines */ } from '../utils/util'
=======
import { analyzeLine } from "../utils/analyzeLine"
// import { modifyLines } from '../utils/modifyLines'
>>>>>>> main
import { Paragraph, Words } from './Text'

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
<<<<<<< HEAD
=======

>>>>>>> main
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
<<<<<<< HEAD
      const { isLineAChordLine: ILine1, isLineEmpty: IEmpty1 } =
        analyzeLine(lines[i]) || 'aiyfwdauyfdwiu7atdfi'

      const { isLineAChordLine: ILine2, isLineEmpty: IEmpty2 } =
        analyzeLine(lines[i + 1]) || 'iadgwiaygdioawda'

      if (ILine1 && !ILine2 && !IEmpty1 && !IEmpty2) {
=======
      const {
        isLineAChordLine: ILine1,
        isLineEmpty: IEmpty1
      } = analyzeLine(lines[i]) || 'aiyfwdauyfdwiu7atdfi'

      const {
        isLineAChordLine: ILine2,
        isLineEmpty: IEmpty2
      } = analyzeLine(lines[i + 1]) || 'iadgwiaygdioawda'

      if (ILine1 && !ILine2 && !IEmpty1 && !IEmpty2) {

>>>>>>> main
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

  // const template: JSX.Element[] = []
  // for (let i = 0; i < fittingParagraphs.length; i++) {
  //  const regex = /(\*_([^*_]+)_\*)|(\*[^*_]+\*)|(_[^*_]+_)|(~[^~]+~)|(\*~_([^*_]+)_~\*)|(\*~([^*_]+)~\*)|(\*[^*_]+~\*)|(_[^*_]+~_)|([^*_]+)/g

  //   const parseText = () => {
  //     const matches = fittingParagraphs[i]?.match(regex) || []

  //     return matches.map((part, index) => {
  //       const modifier = modifyLines(part)
  //       if (modifier.isBoldItalicUnderlineTrue) {
  //         // Bold, Italic, and Underline
  //         return (
  //           <i key={index}>
  //             <u>
  //               <Strong
  //                 fontSize={fontSize}
  //                 lineHeight={lineHeight}
  //                 line={part.slice(3, -3)} // Removing *_- and -_*
  //               />
  //             </u>
  //           </i>
  //         )
  //       } else if (modifier.isBoldItalicTrue) {
  //         // Bold and Italic
  //         return (
  //           <i key={index}>
  //             <Strong
  //               fontSize={fontSize}
  //               lineHeight={lineHeight}
<<<<<<< HEAD
  //              line={part.slice(2, -2)} // Removing *_ and _*
=======
  //               line={part.slice(2, -2)} // Removing *_ and _*
>>>>>>> main
  //             />
  //           </i>
  //         )
  //       } else if (modifier.isUnderlineItalicTrue) {
  //         // Underline and Italic
  //         return (
  //           <u key={index}>
  //             <Italic
  //               fontSize={fontSize}
  //               lineHeight={lineHeight}
  //               line={part.slice(2, -2)} // Removing -* and *-
  //             />
  //           </u>
  //         )
  //       } else if (modifier.isUnderlineBoldTrue) {
  //         // Bold and Underline
  //         return (
  //           <u key={index}>
  //             <Strong
  //               fontSize={fontSize}
  //               lineHeight={lineHeight}
  //               line={part.slice(2, -2)} // Removing _- and -_
  //             />
  //           </u>
  //         )
  //       } else if (modifier.underline) {
  //         return (
  //           <Underline
  //             key={index}
  //             fontSize={fontSize}
  //             lineHeight={lineHeight}
  //             line={part.slice(1, -1)}
  //           />
  //         )} else if (modifier.bold) {
  //           return (
  //             <Strong
  //               key={index}
  //               fontSize={fontSize}
  //               lineHeight={lineHeight}
  //               line={part.slice(1, -1)}
  //             />
  //           )}
  //         else if (modifier.italic) {
  //         return (
  //           <Italic
  //             key={index}
  //             fontSize={fontSize}
  //             lineHeight={lineHeight}
  //             line={part.slice(1, -1)}
  //           />
  //         )
  //       } else {
  //         return <Words line={part} key={index} />
  //       }
  //     })
  //   }
  //   const content = (
  //     <Paragraph fontSize={fontSize} lineHeight={lineHeight}>
  //       {parseText().map((a) => a)}
  //     </Paragraph>
  //   )
  //   template.push(content)
  // }

<<<<<<< HEAD
  const test = fittingParagraphs.map((line) => {
    const { words } = analyzeLine(line)
    return words.map((word) => {
      const { bold, italic, underline } = modifyLines(word)
      const arr: string[] = []
      if (bold) {
        console.log(word)
        arr.push(word)
      }
      if (italic) {
        console.log(word)
        arr.push(word)
      }
      if (underline) {
        console.log(word)
        arr.push(word)
      }
      return arr
    })
  })
  console.log(test)
  return (
    <>
      {fittingParagraphs.map((line, i) => {
        const { words, isThereAnAorAnEinTheLine } = analyzeLine(line)
        return (
          <p
            key={i}
            className="whitespace-pre-wrap font-mono"
            style={{ fontSize, lineHeight }}
          >
            {words.map((word, index) => {
              const isChord =
                word.match(regex.chordRegex) && !isThereAnAorAnEinTheLine
              if (isChord) {
                return (
                  <b
                    key={index}
                    className="font-semibold text-blue-700 dark:text-blue-500"
                  >
                    {word}{' '}
                  </b>
                )
              }
              return <span key={index}>{word} </span>
            })}
          </p>
=======
  return (
    <>
      {fittingParagraphs.map((line, i) => {
        return (
          <Paragraph fontSize={fontSize} lineHeight={lineHeight} key={i}>
            <Words line={line} />
          </Paragraph>
>>>>>>> main
        )
      })}
    </>
  )
}
