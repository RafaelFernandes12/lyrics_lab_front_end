import api from '@/lib/axios'
import { TUser } from '@/models/models'
import { getToken } from '../auth/getToken'

export async function getUser() {
  const token = await getToken()

  if (token) {
    const response = await api.get(`/auth/user`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const data = await response.data
    return data.user as TUser
  } else return null
}
