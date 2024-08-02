import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function editPlaylist(
  id: number,
  name: string,
  description: string,
) {
  try {
    await axios.put(`playlist/${id}`, { name, description }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
