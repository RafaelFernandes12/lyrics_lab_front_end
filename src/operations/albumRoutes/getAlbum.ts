import axios from '@/lib/reqInterceptor'
import { albumProps } from '@/models/albumProps'

export async function getAlbum(id: number) {
  try {
    const response = await axios.get(`/Album/${id}`)
    const playlist: albumProps = response.data
    return playlist
  } catch (error) {
    console.log(error)
  }
}
