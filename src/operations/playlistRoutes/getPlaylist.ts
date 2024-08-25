import api from '@/lib/axios'
import { playlistProps } from '@/models/playlistProps'
import { cookies } from 'next/headers'

export async function getPlaylist(id: number) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get(`/album/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    const playlist: playlistProps = response.data
    return playlist
  } catch (error) {
    console.log(error)
  }
}
