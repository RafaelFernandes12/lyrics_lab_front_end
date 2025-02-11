import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { TAlbum } from '@/models/models'
import { getToken } from '@/operations/auth/getToken'

export async function clientGetAlbums(): Promise<TAlbum[]> {
  try {
    const token = await getToken()

    const response = await api.get(`/album`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const data = await response.data

    const filteredData = data.filter((album: TAlbum) => !album.isDefault)
    return filteredData as TAlbum[]
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter álbuns. Tente novamente mais tarde.')
    return []
  }
}
