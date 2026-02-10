import { LoginResponse } from '@/typing/LoginResponse'
import { del, get, post } from './http'
import { UserSettings } from '@/typing/UserSettings'

export const login = (code: string) => post<LoginResponse>("/dictation/login", { code })
export const getUserSettings = () => get<UserSettings>("/dictation/user-settings")
export const saveUserSettings = (settings: UserSettings) => post<UserSettings>("/dictation/user-settings", settings)