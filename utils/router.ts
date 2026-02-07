declare const uni: any

export const ROUTES = {
  home: '/pages/index',
  category: '/pages/category',
  dictation: '/pages/dictation',
  history: '/pages/history',
  profile: '/pages/profile',
  result: '/pages/result',
} as const

type RouteName = keyof typeof ROUTES

function buildUrl(path: string, params?: Record<string, string | number>): string {
  if (!params || Object.keys(params).length === 0) return path
  const qs = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join('&')
  return `${path}?${qs}`
}

/** 打开新页面（uni.navigateTo） */
export function navigateTo(route: RouteName, params?: Record<string, string | number>): void {
  uni.navigateTo({ url: buildUrl(ROUTES[route], params) })
}

/** 替换当前页面（uni.redirectTo） */
export function redirectTo(route: RouteName, params?: Record<string, string | number>): void {
  uni.redirectTo({ url: buildUrl(ROUTES[route], params) })
}

/** 返回上一页，无历史时回首页 */
export function navigateBack(): void {
  uni.navigateBack({
    fail: () => {
      uni.redirectTo({ url: ROUTES.home })
    },
  })
}

/** 回首页 */
export function goHome(): void {
  uni.redirectTo({ url: ROUTES.home })
}
