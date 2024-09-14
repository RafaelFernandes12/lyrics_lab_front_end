import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { songProps } from '@/models/songProps'
import { cookies } from 'next/headers'

export async function serverGetAllSongs(): Promise<songProps[]> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/song', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return response.data as songProps[]
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter músicas. Tente novamente mais tarde.')
    return []
  }
}
