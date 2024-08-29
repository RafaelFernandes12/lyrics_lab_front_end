import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateAlbumParams {
  name: string
  description: string
}

export async function POST(req: Request) {
  try {
    const { name, description }: CreateAlbumParams = await req.json()

    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.post(
      '/album',
      {
        name,
        description,
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
