'use client'
import { analyzeLine } from '@/utils/lineUtils'
import { regex } from '@/utils/regex'
import React, { useCallback, useState } from 'react'

type TextFittingProps = {
  text: string
}

const TextFitting: React.FC<TextFittingProps> = ({ text }) => {
  const [maxWidth, setMaxWidth] = useState(0)
  const [fontSize, setFontSize] = useState(0)

  const containerRef = useCallback((node: HTMLPreElement) => {
    if (node) {
      const width = node.offsetWidth
      const fontSize = parseInt(window.getComputedStyle(node).fontSize)
      setFontSize(fontSize)
      setMaxWidth(width)
    }
  }, [])

  function breakTextIntoLines(text: string, maxCharsPerLine: number) {
    const lines = []
    let start = 0

    while (start < text.length) {
      let end = start + maxCharsPerLine

      // Ensure end does not exceed text length
      if (end >= text.length) {
        lines.push(text.slice(start))
        break
      }

      while (end > start && text[end] !== ' ') {
        end--
      }

      if (end === start) {
        end = start + maxCharsPerLine
        while (end < text.length && text[end] !== ' ') {
          end++
        }
      }

      lines.push(text.slice(start, end + 1))
      start = end + 1
    }

    return lines
  }

  const getTextWithinWidth = (text: string, maxWidth: number) => {
    const lines = text.split('\n')
    const fittingText: string[] = []
    const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6))

    for (let i = 0; i < lines.length; i++) {
      const {
        isLineAChordLine: ILine1,
        isLineEmpty: IEmpty1,
        isLineATabLine: ITabLine1,
      } = analyzeLine(lines[i])
      const {
        isLineAChordLine: ILine2,
        isLineEmpty: IEmpty2,
        isLineATabLine: ITabLine2,
      } = analyzeLine(lines[i + 1] || 'aaysdiuyawdaoiawvb')
      const parameters =
        ILine1 && !ILine2 && !IEmpty1 && !IEmpty2 && !ITabLine1 && !ITabLine2
      if (parameters) {
        let midPoint = 0
        const lineWithChords: string[] = []
        const updatedChars: string[] = []
        for (let j = i; j < i + 2; j++) {
          updatedChars.push(...breakTextIntoLines(lines[j], maxCharsPerLine))
          if (j === i) midPoint = updatedChars.length
        }
        for (let k = 0; k < midPoint; k++) {
          lineWithChords.push(updatedChars[k])
          lineWithChords.push(updatedChars[k + midPoint])
        }
        fittingText.push(...lineWithChords)
        if (lineWithChords.length < updatedChars.length) {
          const leftWords = updatedChars.filter(
            (chord) => !lineWithChords.includes(chord),
          )
          fittingText.push(...leftWords)
        }

        i++
      } else {
        fittingText.push(...breakTextIntoLines(lines[i], maxCharsPerLine))
      }
    }
    return fittingText
  }
  const fittingParagraphs =
    maxWidth > 0 ? getTextWithinWidth(text, maxWidth) : []
  console.log(fittingParagraphs)
  return (
    <pre ref={containerRef} style={{ fontSize: '1rem', padding: 0, margin: 0 }}>
      {fittingParagraphs.map((line, index) => {
        const { words, isLineATabLine, isThereAnAorAnEinTheLine } =
          analyzeLine(line)
        return (
          <p
            key={index}
            className="whitespace-pre-wrap font-mono"
            style={{ fontSize: '16px' }}
          >
            {words.map((word, index) => {
              const isChord =
                word.match(regex.chordRegex) &&
                !isLineATabLine &&
                !isThereAnAorAnEinTheLine

              return (
                <span
                  key={index}
                  className={`${isChord ? 'font-semibold text-blue-500 dark:text-blue-500' : ''}`}
                >
                  {word}{' '}
                </span>
              )
            })}
          </p>
        )
      })}
    </pre>
  )
}

const App: React.FC = () => {
  const text = `Tom: A
[Intro] A9  E  Bm  D 
        A9  E  Bm
        A9  E  Bm  D 
        G  D/F#  A9
 
E|-12b14r12-12~--12------9-----------------------------|
B|------------------9h10------9-12------10p9-----------|
G|-------------------------11------9-11------9---9/10~-|
D|---------------------------------------------9-------|
A|-----------------------------------------------------|
E|-----------------------------------------------------|

[Refrão] 
 
            A9  A9/C#      D             A9
Porque Ele vive Posso crer no amanhã  Porque Ele vive
           E
Temor não há
 
            A9       D          A9                  A9
Mas eu bem sei, eu sei Que a minha vida Está nas mãos do meu Jesus
            A9                  A9           D
Que vivo está Porque Ele vive Posso crer no amanhã Porque Ele vive
           E
Temor não há
  
            A9
Mas eu bem sei, eu sei              
                G  F#5  G#5          A9/C#  F#m           E/G#
      Que a minha vida Está nas mãos do meu Jesus               E Que vivo está
 
[Segunda Parte] 
 
            A9            D
E quando enfim, chegar a hora
              Bm    A9/C#   F#m             E/G#
Em que a morte enfrentarei Sem medo, então, terei vitória Verei na Glória, ao meu Jesus Que vivo está
 
[Refrão] `

  return (
    <div className="border-2 border-white" style={{ width: '500px' }}>
      <TextFitting text={text} />
    </div>
  )
}

export default App
