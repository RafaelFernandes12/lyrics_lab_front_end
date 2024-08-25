import axios from 'axios'
import Cookies from 'js-cookie'

export async function login(email: string, password: string) {
  try {
    await axios.post('auth/login', { email, password }).then((res) => {
      Cookies.set('auth_token', res.data.jwt, {
        sameSite: 'None',
        secure: true,
      })
      return res
    })
  } catch (error) {
    console.log(error)
  }
}
