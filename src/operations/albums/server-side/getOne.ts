import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { TAlbum } from '@/models'
import { cookies } from 'next/headers'

export async function serverGetAlbum(id: number): Promise<TAlbum | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get(`/album/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return response.data as TAlbum
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter o álbum. Tente novamente mais tarde.')
    return null
  }
}
