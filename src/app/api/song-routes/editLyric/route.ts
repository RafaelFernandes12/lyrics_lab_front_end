import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface EditLyricParams {
  id: number
  lyric: string
}

export async function PUT(req: Request) {
  try {
    const { id, lyric }: EditLyricParams = await req.json()

    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.put(
      `/song/${id}`,
      {
        lyric,
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
