import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface CreateAlbumParams {
  name: string
  description: string
}

export async function clientCreateAlbum({
  name,
  description,
}: CreateAlbumParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.post(
      '/album',
      {
        name,
        description,
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
      'Failed to create album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
