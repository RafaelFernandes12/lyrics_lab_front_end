import { ErrorHandler } from '@/helpers/ErrorHandler'
import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'
import { v4 as uuidv4 } from 'uuid'
export async function clientDeleteAlbum(id: number): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api
      .delete(`/album/${id}`, {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      })
      .then((r) => {
        SuccessHandler({ id: uuidv4(), message: 'Álbum excluído com sucesso!' })
        return r
      })

    return response.status === 200
  } catch (error) {
    ErrorHandler(error, 'Falha ao excluir o álbum. Tente novamente mais tarde.')
    return false
  }
}
