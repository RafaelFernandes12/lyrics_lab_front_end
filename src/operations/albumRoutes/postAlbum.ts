import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function postAlbum(name: string, description: string) {
  try {
    await axios.post('album', { name, description }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
