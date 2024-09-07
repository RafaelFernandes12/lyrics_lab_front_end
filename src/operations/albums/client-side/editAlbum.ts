import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface EditAlbumParams {
  id: number
  name?: string
  description?: string
  image?: string
}

export async function clientEditAlbum({
  id,
  name,
  description,
  image,
}: EditAlbumParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.put(
      `/album/${id}`,
      {
        name,
        description,
        image,
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
      'Failed to edit album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
