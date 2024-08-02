import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function postSong(name: string, tone: string, playlistId: number) {
  try {
    await axios.post('Song', { name, tone, playlistId }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
