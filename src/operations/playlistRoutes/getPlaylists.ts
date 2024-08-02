import axios from '@/lib/reqInterceptor'
import { playlistProps } from '@/models/playlistProps'

export async function getPlaylists() {
  try {
    const response = await axios.get('/Playlist')
    const playlists: playlistProps[] = response.data
    return playlists
  } catch (error) {
    console.log(error)
  }
}
