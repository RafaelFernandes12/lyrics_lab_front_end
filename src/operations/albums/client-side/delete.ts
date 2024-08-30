import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

export async function clientDeleteAlbum(id: number): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.delete(`/album/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return response.status === 200
  } catch (error) {
    console.error(
      'Failed to delete album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
