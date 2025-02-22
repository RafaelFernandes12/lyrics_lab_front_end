'use client'

import ImageIcon from '@mui/icons-material/Image'
import { useRef, useState } from 'react'

const UploadImage = ({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void
}) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFileName(selectedFile.name)
      onFileSelect(selectedFile)
    } else {
      setFileName(null)
      onFileSelect(null)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="bg-primaria flex items-center gap-2 rounded p-2 text-white"
      >
        <ImageIcon />
        Escolher imagem
      </button>
      {fileName && <span className="dark:text-black">{fileName}</span>}
    </div>
  )
}

export default UploadImage
