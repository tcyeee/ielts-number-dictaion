import { useUserStore } from '@/stores/user'

declare const uni: any
// const BASE_URL = "https://tcyeee.top/api"
const BASE_URL = "http://127.0.0.1:3000"

function getAuthHeader(): Record<string, string> {
  const userStore = useUserStore()
  const headers: Record<string, string> = {}
  if (userStore.token) {
    headers['Authorization'] = 'Bearer ' + userStore.token
  }
  return headers
}

function request<T>(method: string, url: string, data?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      header: getAuthHeader(),
      data,
      success: (res: any) => resolve(res.data as T),
      fail: (err: any) => reject(err),
    })
  })
}

export function get<T>(url: string): Promise<T> {
  return request<T>('GET', url)
}

export function post<T>(url: string, data?: any): Promise<T> {
  return request<T>('POST', url, data)
}

export function put<T>(url: string, data?: any): Promise<T> {
  return request<T>('PUT', url, data)
}

export function del<T>(url: string): Promise<T> {
  return request<T>('DELETE', url)
}
