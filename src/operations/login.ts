import { api } from '@/lib/axios'

export async function login(email: string, password: string) {
  const message = await api.post(
    'auth/login',
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  )
  return message
}
