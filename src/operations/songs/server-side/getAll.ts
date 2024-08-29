import api from '@/lib/axios'
import { songProps } from '@/models/songProps'
import { cookies } from 'next/headers'

export async function serverGetAllSongs(): Promise<songProps[]> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/song', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return response.data as songProps[]
  } catch (error) {
    console.error(
      'Failed to get all songs:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return []
  }
}
