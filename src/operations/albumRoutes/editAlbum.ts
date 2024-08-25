import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function editAlbum(id: number, name: string, description: string) {
  try {
    await axios.put(`album/${id}`, { name, description }).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
