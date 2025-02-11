'use client'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { fetcher } from '@/lib/fetcher'
import { urlIdProps } from '@/models/models'
import { clientEditSong } from '@/operations/songs/client-side/editSong'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import EditIcon from "@mui/icons-material/Edit";
import { TSong } from '@/models/models'

type InputProps = {
  text?: string
  className?: ClassNameValue
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ text, className, ...rest }: InputProps) {
  return (
    <div>
      {text && <span>{text}</span>}
      <input
        className={twMerge('bg-slate-200 p-2 text-3xl', className)}
        {...rest}
      />
    </div>
  )
}

type data = Omit<TSong, 'id' | 'createdAt' | 'albums'>

export default function EditSong({ params }: urlIdProps) {
  const id = params.id
  const { push } = useRouter()
  const { data, isLoading } = useSWR<data>(`/song/${id}`, fetcher)
  const [text, setText] = useState<data>({
    name: '',
    tone: '',
    lyric: '',
    bpm: 0,
    compass: '',
  })

  useEffect(() => {
    if (data) {
      setText({ ...data })
    }
  }, [data])

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="flex justify-between max-lg:flex-col">
      <div className="m-auto bg-white p-6 dark:bg-headerDark max-lg:w-full md:min-w-[800px]">
        <div className="flex flex-col gap-2">
          <div className='flex justify-between'>
            <Input
              value={text.name}
              onChange={(e) =>
                setText((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <button
              onClick={() =>
                clientEditSong({ id, ...text }).then(() => push(`/song/${id}`))
              }>
              <EditIcon />
            </button>
          </div>
          <Input
            text="Tom: "
            className="p-1 text-xl"
            value={text.tone}
            onChange={(e) =>
              setText((prev) => ({ ...prev, tone: e.target.value }))
            }
          />
          <div className="flex gap-2">
            <Input
              type="number"
              className="w-20 p-1 text-xl"
              text="Bpm: "
              value={text.bpm.toString()}
              onChange={(e) =>
                setText((prev) => ({ ...prev, bpm: parseInt(e.target.value) }))
              }
            />
            <Input
              className="w-20 p-1 text-xl"
              text="Compasso: "
              value={text.compass}
              onChange={(e) =>
                setText((prev) => ({ ...prev, compass: e.target.value }))
              }
            />
          </div>
        </div>
        {/* <ReactQuill value={text.lyrics} */}
        {/*   onChange={(lyrics) => { */}
        {/*     setText((prev) => ({ */}
        {/*       ...prev, */}
        {/*       lyrics */}
        {/*     })) */}
        {/**/}
        {/*   }} */}
        {/*   placeholder="Comece aqui" */}
        {/* /> */}
        <textarea
          onChange={(e) => {
            setText((prev) => ({
              ...prev,
              lyric: e.target.value,
            }))
          }}
          value={text.lyric}
          className="mt-10 h-[1200px] w-full resize-none rounded-sm bg-slate-100 p-1 font-mono text-sm outline-none max-sm:w-full"
          placeholder="Comece aqui"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
