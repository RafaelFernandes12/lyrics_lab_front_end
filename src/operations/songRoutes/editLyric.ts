import axios from '@/lib/reqInterceptor'

export async function editLyric(id: number, lyric: string) {
  try {
    await axios.put(`song/${id}`, { lyric })
  } catch (error) {
    console.log(error)
  }
}
