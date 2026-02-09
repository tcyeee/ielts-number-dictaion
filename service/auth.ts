declare const uni: any

import { useUserStore } from '@/stores/user'
import { login } from './api'

export async function loginAndAuth(): Promise<void> {
  const userStore = useUserStore()
  userStore.setLoading()

  try {
    const code = await wxLogin()
    const res = await login(code)
    userStore.setLogin(res.token, res.openid)
    console.log('登录成功, uid:', res.openid)
  } catch (err) {
    userStore.setFailed()
    console.error('登录失败:', err)
  }
}

function wxLogin(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    uni.login({
      success: (res: any) => resolve(res.code),
      fail: (err: any) => reject(err),
    })
  })
}
