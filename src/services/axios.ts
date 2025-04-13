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
    const response: AxiosResponse<T> = await axiosInstance.get<T>(endPoint)
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function post<T>(endPoint: string, body: object): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      endPoint,
      body,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function put<T>(endPoint: string, body: object): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      endPoint,
      body,
    )
    return response.data
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}

export async function del<T>(endPoint: string, id: number): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      `${endPoint}/${id}`,
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

export async function verifySession() {
  await axiosInstance.get('/auth/verify-session')
  return true
}

export async function changeName(id: number, name: string) {
  try {
    await axiosInstance.put(`/user/${id}`, { name }).then((r) => {
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
        .put(`/user/${data.user.id}`, { password })
        .then(() => {
          logout()
        })
    }
  } catch (error: any) {
    throw new Error(error || 'Erro na requisição.')
  }
}
