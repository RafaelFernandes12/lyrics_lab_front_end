import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

interface paragraphProps {
  className?: ClassNameValue
  children?: ReactNode
  fontSize: number
  line: string
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
        return (
          <span
            key={index}
            className={twMerge(
              isChord ? 'font-semibold text-blue-700 dark:text-blue-500' : '',
              className,
            )}
          >
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
  const initialIndex = line.indexOf('*')
  const lastIndex = line.lastIndexOf('*') + 1
  let wordsInsideStars = line.substring(initialIndex, lastIndex)
  line = line.replace(wordsInsideStars, '')
  wordsInsideStars = wordsInsideStars.replace(/\*/g, '')
  const italic = (
    <i>
      <Words line={wordsInsideStars} />
    </i>
  )
  const normalText = <Words line={line} />

  return (
    <p
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {italic} {normalText}
    </p>
  )
}
export function Strong({ fontSize, className, line }: paragraphProps) {
  const initialIndex = line.indexOf('_')
  const lastIndex = line.lastIndexOf('_') + 1
  let wordsInsideUnderline = line.substring(initialIndex, lastIndex)
  line = line.replace(wordsInsideUnderline, '')
  wordsInsideUnderline = wordsInsideUnderline.replace(/_/g, '')
  const strong = (
    <strong>
      <Words line={wordsInsideUnderline} />
    </strong>
  )
  const normalText = <Words line={line} />

  return (
    <p
      className={twMerge('whitespace-pre-wrap font-mono', className)}
      style={{ fontSize }}
    >
      {strong} {normalText}
    </p>
  )
}
