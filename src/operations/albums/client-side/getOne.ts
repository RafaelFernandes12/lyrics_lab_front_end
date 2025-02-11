import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { TAlbum } from '@/models/models'
import { getToken } from '@/operations/auth/getToken'

export async function clientGetOneAlbum(id: number): Promise<TAlbum> {
  try {
    const token = await getToken()

    const response = await api.get(`/album/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    const data = await response.data

    if (data.isDefault) {
      throw new Error('Este álbum é padrão e não pode ser acessado.')
    }

    return data as TAlbum
  } catch (error) {
    ErrorHandler(error, 'Falha ao obter o álbum. Tente novamente mais tarde.')
    throw error
  }
}
