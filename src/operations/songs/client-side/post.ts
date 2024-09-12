import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { getToken } from '@/operations/auth/getToken'
import { v4 as uuidv4 } from 'uuid'

interface CreateSongParams {
  name: string
  tone: string
  albumIds: number[]
}

export async function clientCreateSong({
  name,
  tone,
  albumIds,
}: CreateSongParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api
      .post(
        '/song',
        {
          name,
          tone,
          albumIds,
        },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then((res) => {
        SuccessHandler({ id: uuidv4(), message: 'Música criada com sucesso!' })
        return res
      })

    return response.status === 201
  } catch (error) {
    console.error(
      'Failed to create song:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
