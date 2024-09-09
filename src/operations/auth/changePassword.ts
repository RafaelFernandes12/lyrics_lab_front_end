import api from '@/lib/axios'
import { getToken } from './getToken'
import { logout } from './logout'

export async function changePassword(
  email: string,
  oldPass: string,
  newPass: string,
) {
  const token = await getToken()
  const password = oldPass

  try {
    const response = await api.post('auth/login', { email, password })
    const data = response.data

    if (data.jwt === token) {
      const password = newPass
      await api
        .put(
          `/album/user/${data.user.id}`,
          { password },
          {
            headers: {
              Authorization: token ? `${token}` : undefined,
            },
          },
        )
        .then(() => {
          logout()
        })
    }
  } catch (error) {
    console.log(error)
  }
}
