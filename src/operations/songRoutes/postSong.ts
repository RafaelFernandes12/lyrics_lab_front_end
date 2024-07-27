import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function postSong(playlistId: number) {
  try {
    await axios.post('Song', { name: '', lyric: '', playlistId }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
