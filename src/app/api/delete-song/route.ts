import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  const { id } = await req.json()

  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    await api.delete(`/song/${id}`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

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
