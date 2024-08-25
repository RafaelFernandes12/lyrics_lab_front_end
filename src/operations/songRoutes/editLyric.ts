import api from '@/lib/axios'
import { cookies } from 'next/headers'

export async function editLyric(id: number, lyric: string) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.put(
      `song/${id}`,
      { lyric },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
  } catch (error) {
    console.log(error)
  }
}
