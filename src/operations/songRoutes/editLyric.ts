import api from '@/lib/axios'

export async function editLyric(id: number, lyric: string, token?: string) {
  try {
    await api.put(
      `song/${id}`,
      { lyric },
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
