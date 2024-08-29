import { albumProps } from '@/models/albumProps'

export async function clientGetAlbums(): Promise<albumProps[]> {
  try {
    const response = await fetch(`/api/album-routes/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data as albumProps[]
  } catch (error) {
    console.error(
      'Failed to get albums:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return []
  }
}
