import { ErrorHandler } from '@/helpers/ErrorHandler'
import api from '@/lib/axios'
import { albumProps } from '@/models/albumProps'
import { getToken } from '@/operations/auth/getToken'
interface EditSongParams {
  id: number
  name: string
  lyric?: string
  tone: string
  albums?: albumProps[]
  bpm?: number
  compass?: string
}

export async function clientEditSong({
  id,
  name,
  lyric,
  tone,
  albums,
  bpm,
  compass,
}: EditSongParams): Promise<boolean> {
  try {
    const token = await getToken()
    const albumIds = albums?.map((album) => album.id) || []
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
