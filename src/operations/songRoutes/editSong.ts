import api from '@/lib/axios'
import { cookies } from 'next/headers'

export async function editSong(id: number, name: string, lyric: string) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.put(
      `song/${id}`,
      { name, lyric },
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
