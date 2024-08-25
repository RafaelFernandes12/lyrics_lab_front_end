import api from '@/lib/axios'

export async function login(email: string, password: string) {
  try {
    const response = await api.post('auth/login', { email, password })
    const jwt = response.data
    return jwt
  } catch (error) {
    console.log(error)
  }
}
