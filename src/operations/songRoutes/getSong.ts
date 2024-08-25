import api from '@/lib/axios'
import { songProps } from '@/models/songProps'
import { cookies } from 'next/headers'

export async function getSong(id: number) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get(`/song/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    const song: songProps = response.data
    return song
  } catch (error) {
    console.log(error)
  }
}
