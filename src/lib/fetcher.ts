import axios from './reqInterceptor'

export const fetcher = (url: string) => axios.get(url).then((r) => r.data)
