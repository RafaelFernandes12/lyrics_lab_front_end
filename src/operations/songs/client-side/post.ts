interface CreateSongParams {
  name: string
  tone: string
  albumId: number
}

export async function clientCreateSong(
  params: CreateSongParams,
): Promise<boolean> {
  try {
    const response = await fetch(`/api/song-routes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    const result = await response.json()

    return result.success
  } catch (error) {
    console.error(
      'Failed to create song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
