/* eslint-disable prettier/prettier */
export const lyrics = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#",
];
export const chordRegex =
  /\b[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|2|4|5|6|7|9|11|13)?(\d+)?(\/[A-G](#|b)?)?\b/g
export const tabLineRegex = /-{2,}/
export const squareBracketContentRegex = /\[.*?\]/g

export const tomUpAndDownRegex = /\b[A-G](#|b)?/g
