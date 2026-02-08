import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      name: "Alex",
      level: 12,
      streak: 5,
      avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Alex&backgroundColor=ffdfbf",
    },
    settings: {
      isDarkMode: true,
      currentLanguage: "EN",
      questionsPerSession: 10,
      notification: {
        dailyReminder: true,
        weeklyProgress: true,
        newModules: true,
        practiceTime: "20:00",
      }
    }
  }),
  actions: {
    updateUserInfo(info: Partial<typeof this.userInfo>) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    toggleDarkMode(value: boolean) {
      this.settings.isDarkMode = value;
    },
    setLanguage(lang: string) {
      this.settings.currentLanguage = lang;
    },
    setQuestionsPerSession(count: number) {
      this.settings.questionsPerSession = count;
    },
    updateNotificationSettings(settings: Partial<typeof this.settings.notification>) {
      this.settings.notification = { ...this.settings.notification, ...settings };
    }
  },
});
