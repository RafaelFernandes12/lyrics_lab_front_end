import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { analyzeLine } from '../utils/util'
import { regex } from '../utils/regex'

interface paragraphProps {
  className?: ClassNameValue
  children?: ReactNode
  fontSize: number
  lineHeight: number
  line?: string
}
interface wordsProps {
  className?: ClassNameValue
  line: string
}
export function Words({ line, className }: wordsProps) {
  const { words, isThereAnAorAnEinTheLine } = analyzeLine(line)
  return (
    <>
      {words.map((word, index) => {
        const isChord =
          word.match(regex.chordRegex) && !isThereAnAorAnEinTheLine
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
export function Paragraph({
  children,
  fontSize,
  lineHeight,
  className,
}: paragraphProps) {
  return (
    <p
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize, lineHeight }}
    >
      {children}
    </p>
  )
}

export function Italic({
  fontSize,
  lineHeight,
  className,
  line,
}: paragraphProps) {
  return (
    <em
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize, lineHeight }}
    >
      {line}
    </em>
  )
}
export function Strong({
  fontSize,
  lineHeight,
  className,
  line,
}: paragraphProps) {
  return (
    <strong
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize, lineHeight }}
    >
      {line}
    </strong>
  )
}
export function Underline({
  fontSize,
  lineHeight,
  className,
  line,
}: paragraphProps) {
  return (
    <u
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize, lineHeight }}
    >
      {line}
    </u>
  )
}
