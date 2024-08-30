import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface CreateSongParams {
  name: string
  tone: string
  albumId: number
}

export async function clientCreateSong({
  name,
  tone,
  albumId,
}: CreateSongParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.post(
      '/song',
      {
        name,
        tone,
        albumId,
      },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )

    return response.status === 201
  } catch (error) {
    console.error(
      'Failed to create song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
