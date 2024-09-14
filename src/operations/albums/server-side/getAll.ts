import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { albumProps } from '@/models/albumProps'
import { cookies } from 'next/headers'

export async function serverGetAllAlbums(): Promise<albumProps[]> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get('/album', {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const data = await response.data
    const filteredData = data.filter((album: albumProps) => !album.isDefault)
    return filteredData as albumProps[]
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter álbuns. Tente novamente mais tarde.')
    return []
  }
}
