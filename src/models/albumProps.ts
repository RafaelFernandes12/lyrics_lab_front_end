import { songProps } from './songProps'

export interface albumProps {
  id: number
  name: string
  description: string
  image: string
  isDefault: boolean
  userId: number
  songs: songProps[]
}
