import { songProps } from './songProps'

export interface albumProps {
  id: number
  name: string
  description: string
  image: string
  userId: number
  songs: songProps[]
}
