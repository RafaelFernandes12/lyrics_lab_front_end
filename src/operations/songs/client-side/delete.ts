export async function clientDeleteSong(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/song-routes/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()

    return result.success
  } catch (error) {
    console.error(
      'Failed to delete song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
