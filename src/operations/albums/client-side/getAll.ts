import api from '@/lib/axios'
import { albumProps } from '@/models/albumProps'
import { getToken } from '@/operations/auth/getToken'

export async function clientGetAlbums(): Promise<albumProps[]> {
  try {
    const token = await getToken()

    const response = await api.get(`/album`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const data = await response.data
    return data as albumProps[]
  } catch (error) {
    console.error(
      'Failed to get albums:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return []
  }
}
