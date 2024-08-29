import { songProps } from './songProps'

export interface albumProps {
  id: number
  name: string
  description: string
  image: any
  userId: number
  songs: songProps[]
}
