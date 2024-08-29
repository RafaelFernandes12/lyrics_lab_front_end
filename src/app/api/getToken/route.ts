import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')?.value

  if (token) {
    res.status(200).json({ token })
  } else {
    res.status(401).json({ message: 'Token not found' })
  }
}
