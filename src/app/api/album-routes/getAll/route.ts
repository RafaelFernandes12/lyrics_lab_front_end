import api from '@/lib/axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')?.value

    const response = await api.get(`/album`, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })

    return NextResponse.json(response.data)
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
