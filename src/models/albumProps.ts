import { songProps } from './songProps'

export interface albumProps {
  id: number
  name: string
  description: string
  userId: number
  songs: songProps[]
}
