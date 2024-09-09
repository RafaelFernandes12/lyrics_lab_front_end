import api from '@/lib/axios'

export async function logout() {
  await api.post('/auth/logout')
  window.location.href = '/login'
}
