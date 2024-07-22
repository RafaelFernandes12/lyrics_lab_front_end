import axios from '@/lib/reqInterceptor'

export async function getUser() {
  try {
    const data = await axios.get('auth/user')
    return data
  } catch (error) {
    console.log(error)
  }
}
