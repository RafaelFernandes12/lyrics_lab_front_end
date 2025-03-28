/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { getToken } from './getToken'

const detectBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL_API || 'http://localhost:5214/api'
}

export const axiosInstance = axios.create({
  baseURL: detectBaseUrl(),
  withCredentials: true,
})

export async function get<T>(endPoint: string): Promise<T> {
  try {
    const token = (await getToken()) || ''
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

export async function post<T>(endPoint: string, body: object): Promise<T> {
  try {
    const token = (await getToken()) || ''
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

export async function put<T>(endPoint: string, body: object): Promise<T> {
  try {
    const token = (await getToken()) || ''
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

export async function del<T>(endPoint: string, id: number): Promise<T> {
  try {
    const token = (await getToken()) || ''
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
    //const data = response.data
    //return data

    const { user, jwt } = response.data.value;

    if (jwt) {
      localStorage.setItem('jwt', jwt);
    }
    
    return { user, token: jwt };

  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function logout() {
  await axiosInstance.post('/auth/logout')
}

export async function register(name: string, email: string, password: string) {
  try {
    await axiosInstance.post('/auth/register', { name, email, password })
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function changeName(id: number, name: string) {
  try {
    const token = (await getToken()) || ''
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
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function changePassword(
  email: string,
  oldPass: string,
  newPass: string,
) {
  const password = oldPass
  try {
    const token = (await getToken()) || ''
    const response = await axiosInstance.post('auth/login', { email, password })
    const data = response.data.value

    if (data.jwt === token) {
      const password = newPass
      await axiosInstance
        .put(
          `/user/${data.user.id}`,
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
    throw new Error(error || 'Erro na requisição.')
  }
}
