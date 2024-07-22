import { songProps } from './songProps'

export interface playlistProps {
  id: number
  name: string
  description: string
  userId: number
  songs: songProps[]
}
