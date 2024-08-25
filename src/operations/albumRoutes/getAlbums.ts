import axios from '@/lib/reqInterceptor'
import { albumProps } from '@/models/albumProps'

export async function getAlbums() {
  try {
    const response = await axios.get('/Album')
    console.log(response)
    const playlists: albumProps[] = response.data
    return playlists
  } catch (error) {
    console.log(error)
  }
}
