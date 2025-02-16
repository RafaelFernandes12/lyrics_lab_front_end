export const chordSets = {
  sharpChords: [
<<<<<<< HEAD
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
=======
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ],
  flatChords: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
};
>>>>>>> main
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
<<<<<<< HEAD
]
export const chordRegex =
  /(?:\s|^|[_*~])[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?(\/[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?)*(?:\s|$|[_*~])/g
export const noChordRegex = /\b(?![A-G])\w+\b/g

export const AorERegex = /\b[AE](m)?\b(?![/#])/g
export const tomUpAndDownRegex = /[A-G](#|b)?/g

export const insideSymbolsRegex = /(?<=\[|\(|\{_).*(?=\]|\)|\}_)/gm
export const insideStarsRegex = /(?<=\*).*(?=\*)/gm
export const insideUnderlineRegex = /(?<=_).*(?=_)/gm
=======
];
export const chordRegex =
  /(?:\s|^)[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?(\/[A-G](#|b)?(maj|min|dim|aug|sus|m|M|add|7|maj7|m7|7M)?(\d+)?)*(?:\s|$)/g;
export const noChordRegex = /\b(?![A-G])\w+\b/g;

export const AorERegex = /\b[AE](m)?\b(?![/#])/g;
export const tomUpAndDownRegex = /[A-G](#|b)?/g;
export const insideSymbolsRegex = /(?<=\[|\(|\{_).*(?=\]|\)|\}_)/gm;
export const insideStarsRegex = /(?<=\*).*(?=\*)/gm;
export const insideUnderlineRegex = /(?<=_).*(?=_)/gm;
>>>>>>> main

export const regex = {
  chordSets,
  textSizes,
  chordRegex,
  noChordRegex,
  AorERegex,
  tomUpAndDownRegex,
  insideStarsRegex,
  insideUnderlineRegex,
<<<<<<< HEAD
}
=======
};
>>>>>>> main
