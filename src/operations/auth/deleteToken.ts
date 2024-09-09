export async function deleteToken(): Promise<boolean> {
  try {
    const response = await fetch('/api/deleteToken', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Failed to delete token:', error)
    return false
  }
}
