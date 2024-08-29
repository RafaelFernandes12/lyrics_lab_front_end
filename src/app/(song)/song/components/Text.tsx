import { Fragment, ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { analyzeLine } from '../utils/lineUtils'
import { regex } from '../utils/regex'

interface paragraphProps {
  className?: ClassNameValue
  children: ReactNode
  fontSize: number
}
interface wordsProps {
  className?: ClassNameValue
  line: string
}
export function Words({ line }: wordsProps) {
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
            <b key={index} className="text-blue-500 dark:text-blue-500">
              {word}{' '}
            </b>
          )
        }
        return <Fragment key={index}>{word} </Fragment>
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
