import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface EditAlbumParams {
  id: number
  name: string
  description: string
}

export async function PUT(req: Request) {
  try {
    const { id, name, description }: EditAlbumParams = await req.json()

    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.put(
      `/album/${id}`,
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
