import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

interface paragraphProps {
  className?: ClassNameValue
  children?: ReactNode
  fontSize: number
  line?: string
}
interface wordsProps {
  className?: ClassNameValue
  line: string
}
export function Words({ line, className }: wordsProps) {
  const { words, isLineATabLine, isThereAnAorAnEinTheLine } = analyzeLine(line)
  return (
    <>
      {words.map((word, index) => {
        const isChord =
          word.match(regex.chordRegex) &&
          !isLineATabLine &&
          !isThereAnAorAnEinTheLine
        if (isChord) {
          return (
            <b
              key={index}
              className={twMerge(
                'font-semibold text-blue-700 dark:text-blue-500',
                className,
              )}
            >
              {word}{' '}
            </b>
          )
        }
        return (
          <span key={index} className={twMerge('', className)}>
            {word}{' '}
          </span>
        )
      })}
    </>
  )
}
export function Paragraph({ children, fontSize, className }: paragraphProps) {
  return (
    <p
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {children}
    </p>
  )
}

export function Italic({ fontSize, className, line }: paragraphProps) {
  return (
    <em
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {line}
    </em>
  )
}
export function Strong({ fontSize, className, line }: paragraphProps) {
  return (
    <strong
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {line}
    </strong>
  )
}
