import api from './axios'

const getToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/getToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.token || null
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

  const response = await api.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  })

  return response.data
}
