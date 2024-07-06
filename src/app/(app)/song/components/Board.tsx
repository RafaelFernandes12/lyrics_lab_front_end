import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Board() {
  const [text, setText] = useState('')
  const [isChecked, setIsChecked] = useState(true)

  useEffect(() => {
    const textarea = document.getElementById('textarea')
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [text, isChecked])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  const renderText = () => {
    const lines = text.split('\n')
    return lines.map((line, index) => (
      <p key={index} className="font-mono text-sm outline-none">
        {line.split(' ').map((word, idx) => {
          const style = {
            color: 'inherit',
            fontWeight: 'normal',
          }

          if (['oi', 'ei', 'ou'].includes(word.toLowerCase())) {
            style.color = 'rgb(6 182 212)'
            style.fontWeight = 'bold'
          }

          return (
            <span key={idx} style={style}>
              {word}
              {idx < line.split(' ').length - 1 && ' '}
            </span>
          )
        })}

        {'\n'}
      </p>
    ))
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
          id="textarea"
          value={text}
          onChange={handleChange}
          className="mt-10 w-[290px] resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none"
          rows={1}
          placeholder="Comece aqui"
          spellCheck={false}
        />
      ) : (
        <p
          id="p"
          className="mt-10 w-[290px] whitespace-pre-wrap break-words font-mono text-sm outline-none"
        >
          {renderText()}
        </p>
      )}
    </div>
  )
}
