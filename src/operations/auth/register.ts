import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'

export async function register(name: string, email: string, password: string) {
  try {
    await api.post('/auth/register', { name, email, password })
  } catch (error) {
    ErrorHandler(error, 'Esse email já foi cadastrado.')
  }
}
