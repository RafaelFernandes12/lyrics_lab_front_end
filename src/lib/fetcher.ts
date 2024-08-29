import axios from 'axios'

const getToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get('/api/getToken')
    return response.data.token || null
  } catch (error) {
    console.error('Failed to get token:', error)
    return null
  }
}

export const fetcher = async (url: string) => {
  const token = await getToken()

  if (!token) {
    throw new Error('No token found')
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  })

  return response.data
}
