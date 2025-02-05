import { regex } from "./regex";


export function analyzeLine(line: string) {

  const safeLine = line || "";
  const words = safeLine.split(" ");

  const isLineAChordLine = words.every(
    (word) => regex.chordRegex.test(word) || word === ""
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

