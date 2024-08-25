import api from '@/lib/axios'
import { songProps } from '@/models/songProps'
import { cookies } from 'next/headers'

export async function getSongs() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/song', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const songs: songProps[] = response.data
    return songs
  } catch (error) {
    console.log(error)
    return []
  }
}
