/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

const detectBaseUrl = (): string => {
  return process.env.BASE_URL_API || 'http://localhost:5214/api'
}

export const axiosInstance = axios.create({
  baseURL: detectBaseUrl(),
  withCredentials: true,
})

export async function get<T>(endPoint: string, token: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(endPoint, {
      headers: {
        Authorization: token ? `${token}` : undefined,
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function post<T>(
  endPoint: string,
  body: object,
  token: string,
): Promise<T> {
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
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function put<T>(
  endPoint: string,
  body: object,
  token: string,
): Promise<T> {
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
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function del<T>(
  endPoint: string,
  id: number,
  token: string,
): Promise<T> {
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
  } catch (error: any) {
    throw new Error(error || 'Erro ao fazer logout.')
  }
}

export async function changeName(id: number, name: string, token: string) {
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
  token: string,
) {
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
  } catch (error: any) {
    throw new Error(
      error || 'Falha ao alterar a senha. Tente novamente mais tarde.',
    )
  }
}
