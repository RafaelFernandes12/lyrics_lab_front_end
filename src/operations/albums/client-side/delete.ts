export async function clientDeleteAlbum(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/album-routes/delete?id=${id}`, {
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
      'Failed to delete album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
