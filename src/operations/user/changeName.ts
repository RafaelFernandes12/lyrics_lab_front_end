import { SuccessHandler } from '@/helpers/SuccessHandler'
import api from '@/lib/axios'
import { v4 as uuidv4 } from 'uuid'
import { getToken } from '../auth/getToken'


export async function changeName(id: number, name: string) {
  const token = await getToken()

  try {
    await api
      .put(
        `/album/user/${id}`,
        { name },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then((r) => {
        SuccessHandler({ id: uuidv4(), message: 'Nome alterado!' })

        return r
      })
  } catch (error) {
    console.log(error)
  }
}
