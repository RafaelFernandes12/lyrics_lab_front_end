import axios from '@/lib/reqInterceptor'
import { songProps } from '@/models/songProps'

export async function getSongs() {
  try {
    const response = await axios.get('/song')
    const songs: songProps[] = response.data
    return songs
  } catch (error) {
    console.log(error)
  }
}
