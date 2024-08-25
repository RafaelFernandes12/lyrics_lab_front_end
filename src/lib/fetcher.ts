import api from '@/lib/axios'

export const fetcher = (url: string, token?: string) => {
  return api
    .get(url, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    .then((r) => r.data)
}
