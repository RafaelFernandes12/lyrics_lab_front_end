import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function postPlaylist(name: string, description: string) {
  try {
    await axios.post('playlist', { name, description }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
