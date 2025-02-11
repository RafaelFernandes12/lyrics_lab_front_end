import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'

export async function login(email: string, password: string) {
  try {
    const response = await api.post('auth/login', { email, password })
    const data = response.data
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.message === 'Incorrect Email') {
      ErrorHandler(error, 'Email inválido')
    } else if (error.response?.data?.message === 'Incorrect Password') {
      ErrorHandler(error, 'Senha incorreta')
    } else {
      ErrorHandler(
        error,
        'Erro ao fazer login. Verifique as informações e tente novamente.',
      )
    }
  }
}
