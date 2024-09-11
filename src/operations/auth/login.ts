import api from '@/lib/axios'

export async function login(email: string, password: string) {
  try {
    const response = await api.post('auth/login', { email, password })
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}
