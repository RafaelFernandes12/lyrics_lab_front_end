import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')?.value

  if (token) {
    return NextResponse.json({ token }, { status: 200 })
  } else {
    return NextResponse.json({ message: 'Token not found' })
  }
}
