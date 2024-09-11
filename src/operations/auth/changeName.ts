import api from '@/lib/axios'
import { getToken } from './getToken'

export async function changeName(id: number, name: string) {
  const token = await getToken()

  try {
    await api.put(
      `/album/user/${id}`,
      { name },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
  } catch (error) {
    console.log(error)
  }
}
