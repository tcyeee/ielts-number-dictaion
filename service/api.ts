import { LoginResponse } from '@/typing/LoginResponse'
import { del, get, post } from './http'

export const login = (code: string) => post<LoginResponse>("/dictation/login", { code })