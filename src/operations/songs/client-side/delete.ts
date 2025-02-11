import { ErrorHandler } from '@/helpers/ErrorHandler'
import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'
import { v4 as uuidv4 } from 'uuid'

export async function clientDeleteSong(id: number): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api
      .delete(`/song/${id}`, {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      })
      .then((res) => {
        SuccessHandler({
          id: uuidv4(),
          message: 'Música excluída com sucesso!',
        })
        return res
      })

    return response.status === 200
  } catch (error) {
    ErrorHandler(
      error,
      'Falha ao excluir a música. Tente novamente mais tarde.',
    )
    return false
  }
}
