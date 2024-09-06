/* eslint-disable prettier/prettier */
export const chordSets = {
  sharpChords: [
    "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
  ],
  flatChords: [
    "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"
  ],
}
export const textSizes = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26]
export const chordRegex =
  /(?![áéíóúÁÉÍÓÚãẽĩõũÃẼĨÕŨâêîôûÂÊÎÔÛ.,\-+=:;])\b[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?(\/[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?)*\b[#+b+]?(?![áéíóúÁÉÍÓÚãẽĩõũÃẼĨÕŨâêîôûÂÊÎÔÛ.,\-+=:;])/g
export const noChordRegex = /\b(?![A-G])\w+\b/g;
export const tabLineRegex = /-{2,}/
export const AorERegex = /\b[AE](m)?\b(?![/#])/g
export const tomUpAndDownRegex = /[A-G](#|b)?/g
export const insideSymbolsRegex = /(?<=\[|\(|\{_).*(?=\]|\)|\}_)/gm
export const insideBracketsRegex = /(?<=\[).*(?=\])/gm
export const insideStarsRegex = /(?<=\*).*(?=\*)/gm
export const insideUnderlineRegex = /(?<=_).*(?=_)/gm
export const regex = {
  chordSets, 
  textSizes,
  chordRegex,
  noChordRegex, 
  tabLineRegex, 
  AorERegex,
  tomUpAndDownRegex,
  insideBracketsRegex,
  insideStarsRegex,
  insideUnderlineRegex,
}
