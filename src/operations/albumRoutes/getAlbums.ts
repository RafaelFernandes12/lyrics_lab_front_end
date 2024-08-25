import api from '@/lib/axios'
import { albumProps } from '@/models/albumProps'
import { cookies } from 'next/headers'

export async function getAlbums() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/album', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    const playlists: albumProps[] = response.data
    return playlists
  } catch (error) {
    console.log(error)
  }
}
