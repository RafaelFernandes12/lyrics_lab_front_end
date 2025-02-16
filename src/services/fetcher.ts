import { axiosInstance } from '@/services/axios'
import { getCookie } from 'cookies-next'

export const fetcher = async (url: string) => {
  const token = (await getCookie('jwt')) || ''

  if (!token) {
    throw new Error('No token found')
  }

  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  })
  return response.data
}
