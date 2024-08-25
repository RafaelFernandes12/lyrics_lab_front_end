import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'

export async function postSong(
  name: string,
  tone: string,
  playlistId: number,
  token?: string,
) {
  try {
    await api
      .post(
        'Song',
        { name, tone, playlistId },
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
