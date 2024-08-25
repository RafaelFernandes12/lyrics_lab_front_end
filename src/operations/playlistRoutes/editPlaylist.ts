import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'

export async function editPlaylist(
  id: number,
  name: string,
  description: string,
  token?: string,
) {
  try {
    await api
      .put(
        `album/${id}`,
        { name, description },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then(() => {
        SuccessHandler()
      })
  } catch (error) {
    console.log(error)
  }
}
