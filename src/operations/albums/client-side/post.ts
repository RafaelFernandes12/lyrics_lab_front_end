import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { songProps } from '@/models/songProps';
import { getToken } from '@/operations/auth/getToken'
import { v4 as uuidv4 } from 'uuid';

interface CreateAlbumParams {
  name: string
  description: string
  // songs: songProps[]
}

export async function clientCreateAlbum({
  name,
  description,
  // songs
}: CreateAlbumParams): Promise<boolean> {
  try {
    const token = await getToken()

    const response = await api
      .post(
        '/album',
        {
          name,
          description,
          // songs
        },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then((res) => {
        SuccessHandler({ id: uuidv4(), message: 'Album criado com sucesso!' })
        return res
      })
    return response.status === 201
  } catch (error) {
    console.error(
      'Failed to create album:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}
