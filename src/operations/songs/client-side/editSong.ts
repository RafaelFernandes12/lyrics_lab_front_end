import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'
interface EditSongParams {
  id: number
  name: string
  lyric?: string
  tone: string
  albumIds?: number[]
  bpm?: number
  compass?: string
}

export async function clientEditSong({
  id,
  name,
  lyric,
  tone,
  albumIds,
  bpm,
  compass,
}: EditSongParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api.put(
      `/song/${id}`,
      {
        name,
        lyric,
        tone,
        albumIds,
        bpm,
        compass,
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
