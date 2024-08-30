import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface EditSongParams {
  id: number
  name: string
  lyric: string
}

export async function clientEditSong({
  id,
  name,
  lyric,
}: EditSongParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.put(
      `/song/${id}`,
      {
        name,
        lyric,
      },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )

    return response.status === 200
  } catch (error) {
    console.error(
      'Failed to edit song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
