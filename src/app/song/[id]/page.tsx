import { urlIdProps } from '@/models/urlIdProps'
import Board from '../components/Board'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Song({ params }: urlIdProps) {
  // const response = await api.get(`/songs/${params.id}`);
  // const song: songProps = response.data;

  return <Board />
}
