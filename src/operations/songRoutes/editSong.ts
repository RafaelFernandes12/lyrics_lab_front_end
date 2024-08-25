import api from '@/lib/axios'

export async function editSong(
  id: number,
  name: string,
  lyric: string,
  token?: string,
) {
  try {
    await api.put(
      `song/${id}`,
      { name, lyric },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
  } catch (error) {
    console.log(error)
  }
}
