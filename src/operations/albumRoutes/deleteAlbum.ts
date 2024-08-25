import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function deleteAlbum(id: number) {
  try {
    await axios.delete(`/album/${id}`).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
