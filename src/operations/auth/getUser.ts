import api from '@/lib/axios'
import { userProps } from '@/models/userProps'

export async function getUser(token?: string) {
  try {
    const response = await api.get('auth/user', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    const user: userProps = response.data.user
    return user
  } catch (error) {
    console.log(error)
  }
}
