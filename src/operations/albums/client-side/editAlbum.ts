import { ErrorHandler } from '@/helpers/ErrorHandler'
import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { TSong } from '@/models/models'
import { getToken } from '@/operations/auth/getToken'
import { v4 as uuidv4 } from 'uuid'
interface EditAlbumParams {
  id: number
  name?: string
  description?: string
  image?: string
  songs?: TSong[]
}

export async function clientEditAlbum({
  id,
  name,
  description,
  image,
  songs,
}: EditAlbumParams): Promise<boolean> {
  try {
    const token = await getToken()
    const songIds = songs?.map((song) => song.id) || []
    const response = await api
      .put(
        `/album/${id}`,
        {
          name,
          description,
          image,
          songIds,
        },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then((r) => {
        SuccessHandler({ id: uuidv4(), message: 'Album editado com sucesso!' })
        return r
      })

    return response.status === 200
  } catch (error) {
    ErrorHandler(error, 'Falha ao editar o álbum. Tente novamente mais tarde.')
    return false
  }
}
