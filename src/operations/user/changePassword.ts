import { ErrorHandler } from '@/helpers/ErrorHandler'
import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { v4 as uuidv4 } from 'uuid'
import { getToken } from '../auth/getToken'
import { logout } from '../auth/logout'

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
          SuccessHandler({ id: uuidv4(), message: 'Senha alterada!' })
          logout()
        })
    }
  } catch (error) {
    ErrorHandler(
      error,
      'Erro ao alterar a senha: Verifique os dados e tente novamente.',
    )
  }
}
