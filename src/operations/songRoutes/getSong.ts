import axios from '@/lib/reqInterceptor'
import { songProps } from '@/models/songProps'

export async function getSong(id: number) {
  try {
    const response = await axios.get(`/song/${id}`)
    const song: songProps = response.data
    return song
  } catch (error) {
    console.log(error)
  }
}
