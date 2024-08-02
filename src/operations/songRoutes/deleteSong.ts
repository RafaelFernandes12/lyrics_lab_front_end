import { SuccessHandler } from '@/helpers/SuccessHandler'
import axios from '@/lib/reqInterceptor'

export async function deleteSong(id: number) {
  try {
    await axios.delete(`/Song/${id}`).then(() => {
      SuccessHandler()
    })
  } catch (error) {
    console.log(error)
  }
}
