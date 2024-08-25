/* eslint-disable prettier/prettier */
export const lyrics = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
];
export const textSizes = ['0.8rem', '0.9rem', '1rem', '1.1rem', '1.2rem', '1.3rem']
export const chordRegex =
  /(?![áéíóúÁÉÍÓÚãẽĩõũÃẼĨÕŨâêîôûÂÊÎÔÛ.,\-+=:;])\b[A-G](b)?(maj|min|dim|aug|sus|m|M|add)?(\d+)?(\/[A-G](b)?)?\b[#+]?(?![áéíóúÁÉÍÓÚãẽĩõũÃẼĨÕŨâêîôûÂÊÎÔÛ.,\-+=:;])/g
export const noChordRegex = /\b(?![A-G])\w+\b/g;
export const tabLineRegex = /-{2,}/
export const matchAorERegex = /\b[AE](m)?\b(?![/#])/g
export const tomUpAndDownRegex = /[A-G](#)?/g

export const regex = {
  lyrics,
  textSizes,
  chordRegex,
  noChordRegex, 
  tabLineRegex, 
  matchAorERegex,
  tomUpAndDownRegex
}
