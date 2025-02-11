import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { TSong } from '@/models/models'
import { cookies } from 'next/headers'

export async function serverGetAllSongs(): Promise<TSong[]> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/song', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return response.data as TSong[]
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter músicas. Tente novamente mais tarde.')
    return []
  }
}
