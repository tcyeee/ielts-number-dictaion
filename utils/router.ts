declare const uni: any

export const ROUTES = {
  index: '/pages/index/index',
  dictation: '/pages/dictation',
  result: '/pages/result',
  history: '/pages/history',
  profileAvatar: '/pages/profile/avatar',
  profilePrivacy: '/pages/terms/privacy',
  profileTerms: '/pages/terms/terms',
  profileNotification: '/pages/profile/notification',
  profileQuestionsPerSession: '/pages/profile/questions-per-session',
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
      uni.reLaunch({ url: ROUTES.index })
    },
  })
}

/** 回首页 */
export function goHome(): void {
  uni.reLaunch({ url: ROUTES.index })
}
