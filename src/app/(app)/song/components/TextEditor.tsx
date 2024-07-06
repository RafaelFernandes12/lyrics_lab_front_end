import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function TextEditor() {
  const [text, setText] = useState('')
  const [isChecked, setIsChecked] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    const textarea = textareaRef.current

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    adjustTextareaHeight()
    const handleResize = () => {
      adjustTextareaHeight()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [text, isChecked])

  const renderText = () => {
    const lines = text.split('\n')

    return lines.map((line, index) => {
      if (line.startsWith('c:')) {
        return (
          <p
            key={index}
            className="w-[280px] whitespace-pre-wrap break-words p-1 font-mono text-sm font-bold text-cyan-500 outline-none"
          >
            {line.substring(2)}
          </p>
        )
      } else if (line.trim() === '') {
        return <p key={index}>&nbsp;</p>
      } else {
        return (
          <p
            key={index}
            className="w-[280px] whitespace-pre-wrap break-words p-1 font-mono text-sm outline-none"
          >
            {line}
          </p>
        )
      }
    })
  }

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          onClick={handleToggle}
          control={<Switch defaultChecked />}
          label="Edição"
        />
      </FormGroup>

      {isChecked ? (
        <textarea
          ref={textareaRef}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value)
          }}
          value={text}
          className="mt-10 w-[280px] resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none"
          placeholder="Comece aqui"
          spellCheck={false}
        />
      ) : (
        <div className="mt-10 w-[280px]">{renderText()}</div>
      )}
    </div>
  )
}
