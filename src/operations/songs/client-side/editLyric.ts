import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'

interface EditLyricParams {
  id: number
  lyric: string
  tone: string
}

export async function clientEditLyric({
  id,
  lyric,
  tone,
}: EditLyricParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.put(
      `/song/${id}`,
      {
        lyric,
        tone,
      },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )

    return response.status === 200
  } catch (error) {
    ErrorHandler(error, 'Falha ao editar a música. Tente novamente mais tarde.')
    return false
  }
}
