import { chordRegex } from "../../../src/app/(song)/song/utils/regex";

const validChords = [
  // Basic Major Chords
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",

  // Sharp and Flat Chords
  "A#",
  "C#",
  "D#",
  "F#",
  "G#",
  "Bb",
  "Db",
  "Eb",
  "Gb",
  "Ab",

  // Minor Chords
  "Am",
  "Bm",
  "Cm",
  "Dm",
  "Em",
  "Fm",
  "Gm",
  "A#m",
  "C#m",
  "D#m",
  "F#m",
  "G#m",
  "Bbm",
  "Dbm",
  "Ebm",
  "Gbm",
  "Abm",

  // Seventh Chords
  "A7",
  "B7",
  "C7",
  "D7",
  "E7",
  "F7",
  "G7",
  "A#m7",
  "C#m7",
  "D#m7",
  "F#m7",
  "G#m7",
  "Bb7",
  "Db7",
  "Eb7",
  "Gb7",
  "Ab7",

  // Major Seventh Chords
  "AMaj7",
  "BMaj7",
  "CMaj7",
  "DMaj7",
  "EMaj7",
  "FMaj7",
  "GMaj7",
  "A#Maj7",
  "C#Maj7",
  "D#Maj7",
  "F#Maj7",
  "G#Maj7",
  "BbMaj7",
  "DbMaj7",
  "EbMaj7",
  "GbMaj7",
  "AbMaj7",

  // Minor Seventh Chords
  "Am7",
  "Bm7",
  "Cm7",
  "Dm7",
  "Em7",
  "Fm7",
  "Gm7",
  "A#m7",
  "C#m7",
  "D#m7",
  "F#m7",
  "G#m7",
  "Bbm7",
  "Dbm7",
  "Ebm7",
  "Gbm7",
  "Abm7",

  // Diminished Chords
  "Adim",
  "Bdim",
  "Cdim",
  "Ddim",
  "Edim",
  "Fdim",
  "Gdim",
  "A#dim",
  "C#dim",
  "D#dim",
  "F#dim",
  "G#dim",
  "Bbdim",
  "Dbdim",
  "Ebdim",
  "Gbdim",
  "Abdim",

  // Augmented Chords
  "Aaug",
  "Baug",
  "Caug",
  "Daug",
  "Eaug",
  "Faug",
  "Gaug",

  // Suspended Chords
  "Asus2",
  "Bsus2",
  "Csus2",
  "Dsus2",
  "Esus2",
  "Fsus2",
  "Gsus2",
  "Asus4",
  "Bsus4",
  "Csus4",
  "Dsus4",
  "Esus4",
  "Fsus4",
  "Gsus4",

  // Add Chords
  "Aadd9",
  "Badd9",
  "Cadd9",
  "Dadd9",
  "Eadd9",
  "Fadd9",
  "Gadd9",

  // Extended Chords
  "A9",
  "B9",
  "C9",
  "D9",
  "E9",
  "F9",
  "G9",
  "A11",
  "B11",
  "C11",
  "D11",
  "E11",
  "F11",
  "G11",
  "A13",
  "B13",
  "C13",
  "D13",
  "E13",
  "F13",
  "G13",
];

describe("chordRegex", () => {
  test("matches valid basic chords", () => {
    validChords.forEach((chord) => {
      expect(chord).toMatch(chordRegex);
    });
  });

  test("matches valid slash chords", () => {
    const validSlashChords = ["C/E", "Dm/F#", "G7/B", "Amaj7/C#"];
    validSlashChords.forEach((chord) => {
      expect(chord).toMatch(chordRegex);
    });
  });

  test("does not match invalid characters", () => {
    const invalidChords = ["H", "I", "J", "K", "L", "Z"];
    invalidChords.forEach((chord) => {
      expect(chord).not.toMatch(chordRegex);
    });
  });

  test("does not match invalid formats", () => {
    const invalidFormats = ["A#maj7b", "C#m7b5/", "Dm7#11#", "Eadd9b"];
    invalidFormats.forEach((chord) => {
      expect(chord).not.toMatch(chordRegex);
    });
  });

  test("does not match non-chord text", () => {
    const nonChordText = ["Hello", "123", "C#m7b5Hello", "Dm7#11World"];
    nonChordText.forEach((text) => {
      expect(text).not.toMatch(chordRegex);
    });
  });

  test("does not match empty string", () => {
    expect("").not.toMatch(chordRegex);
  });

  test("does not match whitespace", () => {
    expect(" ").not.toMatch(chordRegex);
  });

  test("does not match special characters", () => {
    const specialChars = ["A#maj7!", "Dm7@", "C#m7b5#"];
    specialChars.forEach((text) => {
      expect(text).not.toMatch(chordRegex);
    });
  });
});
