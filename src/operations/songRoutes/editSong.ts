import axios from '@/lib/reqInterceptor'

export async function editSong(id: number, name: string, lyric: string) {
  try {
    await axios.put(`song/${id}`, { name, lyric })
  } catch (error) {
    console.log(error)
  }
}
