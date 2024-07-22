import axios from '@/lib/reqInterceptor'
import { playlistProps } from '@/models/playlistProps'

export async function getPlaylist(id: number) {
  try {
    const response = await axios.get(`/Playlist/${id}`)
    const playlist: playlistProps = response.data
    return playlist
  } catch (error) {
    console.log(error)
  }
}
