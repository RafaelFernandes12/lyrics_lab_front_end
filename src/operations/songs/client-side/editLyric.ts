import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface EditLyricParams {
  id: number
  lyric: string
}

export async function clientEditLyric({
  id,
  lyric,
}: EditLyricParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.put(
      `/song/${id}`,
      {
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
      'Failed to edit lyric:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
