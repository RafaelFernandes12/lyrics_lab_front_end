import api from '@/lib/axios'
import { playlistProps } from '@/models/playlistProps'
import { cookies } from 'next/headers'

export async function getPlaylists() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/album', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    const playlists: playlistProps[] = response.data
    return playlists
  } catch (error) {
    console.log(error)
  }
}
