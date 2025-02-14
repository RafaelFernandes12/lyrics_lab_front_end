import { regex } from "./regex";

export function analyzeLine(line: string) {
  const safeLine = line || "";
  const words = safeLine.split(" ");

  const isLineAChordLine = words.every(
    (word) => regex.chordRegex.test(word) || word === "",
  );

  const isInsideStars = regex.insideStarsRegex.test(safeLine);
  const isInsideUndersafeLine = regex.insideUnderlineRegex.test(safeLine);

  const isLineEmpty = words.every((word) => word === "");
  const lenMatchAorE = safeLine.match(regex.AorERegex);
  const lenMatchNoChord = safeLine.match(regex.noChordRegex);

  const matchChordRegex = safeLine.match(regex.chordRegex);

  const isThereAnAorAnEinTheLine = !!(
    regex.AorERegex.test(safeLine) &&
    (matchChordRegex ? matchChordRegex.length < 2 : false) &&
    regex.noChordRegex.test(safeLine)
  );

  const isLineInsideStars = /\*.*\*/gm.test(safeLine);
  const isLineInsideUndersafeLine = /_.*_/gm.test(safeLine);

  return {
    words,
    isThereAnAorAnEinTheLine,
    isLineAChordLine,
    isLineEmpty,
    isInsideStars,
    isInsideUndersafeLine,
    isLineInsideStars,
    isLineInsideUndersafeLine,
  };
}

export function replaceChordsInLine(
  line: string,
  type: keyof typeof regex.chordSets,
  options: {
    shift?: number;
    oppositeChordType?: keyof typeof regex.chordSets;
  },
): string {
  return line.replace(regex.chordRegex, (chord) => {
    let updatedChord = chord;

    const { isThereAnAorAnEinTheLine } = analyzeLine(line);
    const baseChord = chord.match(regex.tomUpAndDownRegex);

    if (baseChord && !isThereAnAorAnEinTheLine) {
      baseChord.forEach((tone) => {
        const index = regex.chordSets[type].indexOf(tone);

        if (index !== -1) {
          let newChord: string;
          if (options.shift)
            newChord =
              regex.chordSets[type][
              (index + options.shift + regex.chordSets[type].length) %
              regex.chordSets[type].length
              ];
          else if (options.oppositeChordType)
            newChord = regex.chordSets[options.oppositeChordType][index];
          else newChord = tone;

          updatedChord = updatedChord.replace(tone, newChord);
        }
      });
    }
    return updatedChord;
  });
}

export function modifyLines(part: string) {
  const bold = /(?<=[\*_~]*\*)\b([^*]+)\b(?=\*[\*_~]*)/g.test(part)
  const italic = /(?<=[\*_~]*_)\b([^_]+)\b(?=_[\*_~]*)/g.test(part)
  const underline = /(?<=[\*_~]*~)\b([^~]+)\b(?=~[\*_~]*)/g.test(part)

  return {
    bold,
    italic,
    underline,
  };
}
