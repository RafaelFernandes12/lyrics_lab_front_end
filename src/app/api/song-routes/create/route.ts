import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateSongParams {
  name: string
  tone: string
  albumId: number
}

export async function POST(req: Request) {
  try {
    const { name, tone, albumId }: CreateSongParams = await req.json()

    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.post(
      '/song',
      {
        name,
        tone,
        albumId,
      },
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    let errorMessage = 'An unknown error occurred'

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    )
  }
}
