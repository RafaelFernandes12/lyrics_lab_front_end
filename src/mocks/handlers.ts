import { TAlbum, TSong } from '@/models'
import { http, HttpResponse } from 'msw'
import { albums, songs } from './mocks'

const api = 'http://localhost:5214/api'

export const handlers = [
  http.get(`${api}/album`, () => {
    return HttpResponse.json<TAlbum[]>(albums)
  }),

  http.get(`${api}/song/1`, () => {
    return HttpResponse.json<TSong>(songs[0])
  }),
]
