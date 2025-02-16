export async function getToken(): Promise<string | null> {
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
