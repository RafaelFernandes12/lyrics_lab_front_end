import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'

export async function postAlbum(
  name: string,
  description: string,
  token?: string,
) {
  try {
    await api
      .post(
        'album',
        { name, description },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then(() => {
        SuccessHandler()
      })
  } catch (error) {
    console.log(error)
  }
}
