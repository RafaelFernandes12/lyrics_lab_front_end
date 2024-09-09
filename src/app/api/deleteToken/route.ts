import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const cookieStore = cookies()
  cookieStore.delete('jwt')

  return NextResponse.json({ message: 'Cookie deleted successfully' })
}
