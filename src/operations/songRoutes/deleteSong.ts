import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'

export async function deleteSong(id: number, token?: string) {
  try {
    await api
      .delete(`/Song/${id}`, {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      })
      .then(() => {
        SuccessHandler()
      })
  } catch (error) {
    console.log(error)
  }
}
