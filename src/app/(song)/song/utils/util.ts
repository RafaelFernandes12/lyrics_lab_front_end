import { regex } from './regex'

export function analyzeLine(line: string) {
  const safeLine = line || ''
  const words = safeLine.split(' ')

  const isLineAChordLine = words.every(
    (word) => regex.chordRegex.test(word) || word === '',
  )

  const isLineEmpty = words.every((word) => word === '')
  const lenMatchAorE = safeLine.match(regex.AorERegex)
  const lenMatchNoChord = safeLine.match(regex.noChordRegex)
  const matchChordRegex = safeLine.match(regex.chordRegex)

  const isThereAnAorAnEinTheLine = !!(
    regex.AorERegex.test(safeLine) &&
    (matchChordRegex ? matchChordRegex.length < 2 : false) &&
    regex.noChordRegex.test(safeLine)
  )

  const bold = /\*((?:[^*]|\*{2})*?)\*(?!\*)/g.test(safeLine)
  const italic = /_((?:[^_]|__)*?)_(?!_)/g.test(safeLine)
  const underline = /~((?:[^~]|~~)*?)~(?!~)/g.test(safeLine)

  const boldMatch = safeLine.match(/\*((?:[^*]|\*{2})*?)\*(?!\*)/g)
  const italicMatch = safeLine.match(/_((?:[^_]|__)*?)_(?!_)/g)
  const underlineMatch = safeLine.match(/~((?:[^~]|~~)*?)~(?!~)/g)

  const isLineInsideStars = /\*.*\*/gm.test(safeLine)
  const isLineInsideUndersafeLine = /_.*_/gm.test(safeLine)

  return {
    words,
    isThereAnAorAnEinTheLine,
    isLineAChordLine,
    isLineEmpty,
    isLineInsideStars,
    isLineInsideUndersafeLine,
    bold,
    italic,
    underline,
    boldMatch,
    italicMatch,
    underlineMatch,
  }
}

export function replaceChordsInLine(
  line: string,
  type: keyof typeof regex.chordSets,
  options: {
    shift?: number
    oppositeChordType?: keyof typeof regex.chordSets
  },
): string {
  return line.replace(regex.chordRegex, (chord) => {
    let updatedChord = chord

    const { isThereAnAorAnEinTheLine } = analyzeLine(line)
    const baseChord = chord.match(regex.tomUpAndDownRegex)

    if (baseChord && !isThereAnAorAnEinTheLine) {
      baseChord.forEach((tone) => {
        const index = regex.chordSets[type].indexOf(tone)

        if (index !== -1) {
          let newChord: string
          if (options.shift)
            newChord =
              regex.chordSets[type][
                (index + options.shift + regex.chordSets[type].length) %
                  regex.chordSets[type].length
              ]
          else if (options.oppositeChordType)
            newChord = regex.chordSets[options.oppositeChordType][index]
          else newChord = tone

          updatedChord = updatedChord.replace(tone, newChord)
        }
      })
    }
    return updatedChord
  })
}
