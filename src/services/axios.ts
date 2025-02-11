import axios, { AxiosResponse } from 'axios'
import { cookies } from 'next/headers'

async function getToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')?.value
  return token
}

const detectBaseUrl = (): string => {
  return process.env.BASE_URL_API || 'http://localhost:5214/api'
}

export const axiosInstance = axios.create({
  baseURL: detectBaseUrl(),
  withCredentials: true,
})

export async function get<T>(endPoint: string): Promise<T> {
  const token = await getToken()
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(endPoint, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function post<T>(endPoint: string, body: object): Promise<T> {
  const token = await getToken()
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      endPoint,
      body,
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function put<T>(endPoint: string, body: object): Promise<T> {
  const token = await getToken()
  try {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      endPoint,
      body,
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function del<T>(endPoint: string, id: string): Promise<T> {
  const token = await getToken()
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      `${endPoint}/${id}`,
      {
        headers: {
          Authorization: token ? `${token}` : undefined,
        },
      },
    )
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post('auth/login', {
      email,
      password,
    })
    const data = response.data
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro ao fazer login.')
  }
}

export async function logout() {
  await axiosInstance.post('/auth/logout')
  window.location.href = '/login'
}

export async function register(name: string, email: string, password: string) {
  try {
    await axiosInstance.post('/auth/register', { name, email, password })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error || 'Erro ao fazer logout.')
  }
}

export async function getUser(endPoint: string) {
  const token = await getToken()
  const baseUrl = detectBaseUrl()

  const response = await fetch(`${baseUrl}/${endPoint}`, {
    headers: {
      Authorization: `${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Erro na requisição')
  }

  return response.json()
}

export async function changeName(id: number, name: string) {
  const token = await getToken()
  try {
    await axiosInstance
      .put(
        `/user/${id}`,
        { name },
        {
          headers: {
            Authorization: token ? `${token}` : undefined,
          },
        },
      )
      .then((r) => {
        return r
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error || 'Falha ao alterar o nome. Tente novamente mais tarde.',
    )
  }
}

export async function changePassword(
  email: string,
  oldPass: string,
  newPass: string,
) {
  const token = await getToken()
  const password = oldPass
  try {
    const response = await axiosInstance.post('auth/login', { email, password })
    const data = response.data

    if (data.jwt === token) {
      const password = newPass
      await axiosInstance
        .put(
          `/album/user/${data.user.id}`,
          { password },
          {
            headers: {
              Authorization: token ? `${token}` : undefined,
            },
          },
        )
        .then(() => {
          logout()
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error || 'Falha ao alterar a senha. Tente novamente mais tarde.',
    )
  }
}

export const fetcher = async (url: string) => {
  const token = await getToken()
  if (!token) {
    throw new Error('No token found')
  }

  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `${token}`,
    },
  })
  return response.data
}
