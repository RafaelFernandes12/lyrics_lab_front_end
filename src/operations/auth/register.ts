import api from '@/lib/axios'

export async function register(name: string, email: string, password: string) {
  await api.post('/auth/register', { name, email, password })
}
