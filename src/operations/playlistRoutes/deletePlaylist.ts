import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function deletePlaylist(id: number) {
  try {
    await axios.delete(`/playlist/${id}`).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
