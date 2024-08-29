interface EditSongParams {
  id: number
  name: string
  lyric: string
}

export async function clientEditSong(params: EditSongParams): Promise<boolean> {
  try {
    const response = await fetch(`/api/song-routes/editSong`, {
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
      'Failed to edit song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
