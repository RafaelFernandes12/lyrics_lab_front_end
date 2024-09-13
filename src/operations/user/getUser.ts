import api from '@/lib/axios'
import { userProps } from '@/models/userProps'
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
    return data.user as userProps
  } else return null
}
