import { getToken } from '@/operations/auth/getToken'
import api from './axios'

export const fetcher = async (url: string) => {
  const token = await getToken()

  if (!token) {
    throw new Error('No token found')
  }

  const response = await api.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  })

  // gambiarra pra pegar o song kkkkkkkkkk
  return response.data[0]
}
