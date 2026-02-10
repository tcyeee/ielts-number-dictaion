import { LoginResponse } from '@/typing/LoginResponse'
import { del, get, post } from './http'
import { UserSettings } from '@/typing/UserSettings'
import { UserProfile } from '@/typing/UserProfile'

export const login = (code: string) => post<LoginResponse>("/dictation/login", { code })
export const getUserSettings = () => get<UserSettings>("/dictation/user-settings")
export const saveUserSettings = (settings: UserSettings) => post<UserSettings>("/dictation/user-settings", settings)

export const getUserProfile = () => get<UserProfile>("/dictation/user-profile")
export const saveUserProfile = (profile: UserProfile) => post<UserProfile>("/dictation/user-profile", profile)
