/* eslint-disable @typescript-eslint/no-unused-vars */
import { regex } from './regex'

export function analyzeLine(line: string) {
  const words = line ? line.split(' ') : []
  const isLineATabLine = words.some((word) => word.match(regex.tabLineRegex))
  const matchAorE = regex.AorERegex.test(line)
  const matchNoChord = regex.noChordRegex.test(line)
  const isLineAChordLine = words.every(
    (word) => regex.chordRegex.test(word) || word === '',
  )
  const isLineInsideSymbols = regex.insideSymbolsRegex.test(line)
  const matchWordInsideSymbols = line
    ? line.match(regex.insideSymbolsRegex)
    : []
  const wordInsideSymbols = matchWordInsideSymbols?.toString() || ''
  const isLineEmpty = words.every((word) => word === '')
  const lenMatchAorE = line ? line.match(regex.AorERegex) : []
  const lenMatchNoChord = line ? line.match(regex.noChordRegex) : []

  const matchChordRegex = line ? line.match(regex.chordRegex) : []
  const isThereAnAorAnEinTheLine = !!(
    matchAorE &&
    matchChordRegex!.length < 2 &&
    matchNoChord
  )

  return {
    words,
    isLineATabLine,
    matchAorE,
    matchNoChord,
    matchChordRegex,
    isThereAnAorAnEinTheLine,
    isLineAChordLine,
    isLineEmpty,
    isLineInsideSymbols,
    wordInsideSymbols,
  }
}
