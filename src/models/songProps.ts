import { albumProps } from './albumProps'

export interface songProps {
  id: number
  name: string
  lyric: string
  tone: string
  createdAt: string
  albums: albumProps[]
}
