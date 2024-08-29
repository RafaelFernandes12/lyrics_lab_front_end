interface EditAlbumParams {
  id: number
  name: string
  description: string
}

export async function clientEditAlbum(
  params: EditAlbumParams,
): Promise<boolean> {
  try {
    const response = await fetch(`/api/album-routes/editAlbum`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result = await response.json()

    return result.success
  } catch (error) {
    console.error(
      'Failed to edit album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
