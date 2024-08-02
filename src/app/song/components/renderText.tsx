interface renderTextProps {
  lines: string[]
  chordRegex: RegExp
  noChordRegex: RegExp
  tabLineRegex: RegExp
  matchAorERegex: RegExp
}

export function renderText({
  lines,
  chordRegex,
  noChordRegex,
  tabLineRegex,
  matchAorERegex,
}: renderTextProps) {
  return lines.map((line, index) => {
    // todos esses consoles logs são necessarios, não toque
    const words = line.split(' ')

    const isLineATibeLine = words.some((word) => word.match(tabLineRegex))
    const matchAorE = matchAorERegex.test(line)
    const lenMatchAorE = line.match(matchAorERegex)
    console.log(lenMatchAorE)
    const matchNoChord = noChordRegex.test(line)
    const lenMatchNoChord = line.match(noChordRegex)
    console.log(lenMatchNoChord)
    const matchChordRegex = line.match(chordRegex) || []
    console.log(matchChordRegex)
    const isThereAnAorAnEinTheLine = !!(
      matchAorE &&
      matchChordRegex?.length < 2 &&
      matchNoChord
    )
    if (isThereAnAorAnEinTheLine) {
      return (
        <p
          key={index}
          className="whitespace-pre-wrap font-mono text-sm font-bold outline-none max-sm:text-xs"
        >
          {words.map((word) => {
            return <>{word} </>
          })}
        </p>
      )
    } else {
      return (
        <p
          key={index}
          className="whitespace-pre-wrap font-mono text-sm font-bold outline-none max-sm:text-xs"
        >
          {words.map((word, index) => {
            if (word.match(chordRegex) && !isLineATibeLine) {
              return (
                <b key={index} className="text-blue-500 dark:text-blue-500">
                  {word}{' '}
                </b>
              )
            }

            return <>{word} </>
          })}
        </p>
      )
    }
  })
}
