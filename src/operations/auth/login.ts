import axios from '@/lib/reqInterceptor'

export async function login(email: string, password: string) {
  try {
    await axios.post('auth/login', { email, password })
  } catch (error) {
    console.log(error)
  }
}
