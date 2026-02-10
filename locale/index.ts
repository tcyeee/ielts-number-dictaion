import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhHans from './zh-Hans.json'

declare const uni: any;

const savedLang = uni.getStorageSync("language") || "zh-Hans"

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-Hans': zhHans
  }
})

export default i18n
