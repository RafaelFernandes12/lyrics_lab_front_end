const chordSets = {
  sharpChords: [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
  ],
  flatChords: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
}
const textSizes = [
  [8, 1],
  [9, 1],
  [10, 1],
  [12, 1],
  [14, 1],
  [16, 1.1],
  [18, 1.1],
  [20, 1.2],
  [22, 1.3],
  [24, 1.4],
  [26, 1.5],
]
const chordRegex =
  /(?:\s|^)[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?(\/[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?)*(?:\s|$)/g
const noChordRegex = /\b(?![A-G])\w+\b/g

const AorERegex = /\b[AE](m)?\b(?![/#])/g
const tomUpAndDownRegex = /[A-G](#|b)?/g

const bold = /\*((?:[^*]|\*{2})*?)\*(?!\*)/g
const italic = /_((?:[^_]|__)*?)_(?!_)/g
const underline = /~((?:[^~]|~~)*?)~(?!~)/g

export const regex = {
  chordSets,
  textSizes,
  chordRegex,
  noChordRegex,
  AorERegex,
  tomUpAndDownRegex,
  bold,
  italic,
  underline,
}
