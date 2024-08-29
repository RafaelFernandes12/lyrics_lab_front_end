import { songProps } from '@/models/songProps'

export async function clientGetSong(id: number): Promise<songProps | null> {
  try {
    const response = await fetch(`/api/song-routes/getOne?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data as songProps
  } catch (error) {
    console.error(
      'Failed to get song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return null
  }
}
