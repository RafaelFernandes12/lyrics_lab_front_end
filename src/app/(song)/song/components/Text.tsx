import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

interface paragraphProps {
  className?: ClassNameValue
  children: ReactNode
  fontSize: number
  line: string
}
interface wordsProps {
  className?: ClassNameValue
  line: string
}
export function Words({ line }: wordsProps) {
  const lineInsideStars = /^\*.*\*$/gm.test(line)
  const lineInsideUnderline = /^_.*_$/gm.test(line)

  if (lineInsideStars) line = line.replace(/\*/g, '')
  else if (lineInsideUnderline) line = line.replace(/_/g, '')

  const { words, isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)
  return (
    <>
      {words.map((word, index) => {
        const isChord =
          word.match(regex.chordRegex) &&
          !isLineATabLine &&
          !isThereAnAorAnEinTheLine
        const isInsideStars = word.match(regex.insideStarsRegex)
        const isInsideUnderline = word.match(regex.insideUnderlineRegex)
        if (isInsideStars) {
          return (
            <i
              key={index}
              className={`${isChord ? 'font-semibold text-blue-700 dark:text-blue-500' : ''}`}
            >
              {isInsideStars.toString()}{' '}
            </i>
          )
        } else if (isInsideUnderline) {
          return (
            <b
              key={index}
              className={`${isChord ? 'font-semibold text-blue-700 dark:text-blue-500' : ''}`}
            >
              {isInsideUnderline.toString()}{' '}
            </b>
          )
        }
        return (
          <span
            key={index}
            className={`${isChord ? 'font-semibold text-blue-700 dark:text-blue-500' : ''}`}
          >
            {word}{' '}
          </span>
        )
      })}
    </>
  )
}

export function Paragraph({
  line,
  children,
  fontSize,
  className,
}: paragraphProps) {
  const lineInsideStars = /^\*.*\*$/gm.test(line)
  const lineInsideUnderline = /^_.*_$/gm.test(line)
  if (lineInsideStars) {
    return (
      <i
        className={twMerge('whitespace-pre-wrap font-mono', className)}
        style={{ fontSize }}
      >
        {children}
      </i>
    )
  }
  if (lineInsideUnderline) {
    return (
      <b
        className={twMerge('whitespace-pre-wrap font-mono', className)}
        style={{ fontSize }}
      >
        {children}
      </b>
    )
  }
  return (
    <p
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {children}
    </p>
  )
}
