import { defineStore } from 'pinia';

declare const uni: any;

export const useUserStore = defineStore('user', {
  state: () => {
    // 从本地存储读取主题设置，默认为 auto（跟随系统）
    const savedTheme = uni.getStorageSync("themeMode") || "auto";
    const token = uni.getStorageSync("token") || "";
    const openid = uni.getStorageSync("openid") || "";

    return {
      token,
      openid,
      loading: false,
      userInfo: {
        name: "Alex",
        level: 12,
        streak: 5,
        avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Alex&backgroundColor=ffdfbf",
      },
      settings: {
        themeMode: savedTheme, // 'auto' | 'light' | 'dark'
        currentLanguage: "EN",
        questionsPerSession: 10,
        dailyGoal: 10,
        notification: {
          dailyReminder: true,
          weeklyProgress: true,
          newModules: true,
          practiceTime: "20:00",
        },
        questionTypes: [
          "Date",
          "Time",
          "Phone",
          "Price",
          "Measurement",
          "Address",
          "Quantity",
          "Percentage"
        ]
      }
    };
  },
  actions: {
    setLoading() {
      this.loading = true;
    },
    setLogin(token: string, openid: string) {
      this.token = token;
      this.openid = openid;
      this.loading = false;
      uni.setStorageSync("token", token);
      uni.setStorageSync("openid", openid);
    },
    setFailed() {
      this.loading = false;
      this.token = "";
      this.openid = "";
    },
    updateUserInfo(info: Partial<typeof this.userInfo>) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    setThemeMode(mode: 'auto' | 'light' | 'dark') {
      this.settings.themeMode = mode;
      // 持久化存储主题设置
      uni.setStorageSync("themeMode", mode);

      // 触发主题更新（通过自定义事件通知 App.vue）
      uni.$emit('themeChange', mode);
    },
    setLanguage(lang: string) {
      this.settings.currentLanguage = lang;
    },
    setQuestionsPerSession(count: number) {
      this.settings.questionsPerSession = count;
    },
    setDailyGoal(count: number) {
      this.settings.dailyGoal = count;
    },
    updateNotificationSettings(settings: Partial<typeof this.settings.notification>) {
      this.settings.notification = { ...this.settings.notification, ...settings };
    },
    updateQuestionTypes(types: string[]) {
      this.settings.questionTypes = types;
    },
    resetQuestionTypes() {
      this.settings.questionTypes = [
        "Date",
        "Time",
        "Phone",
        "Price",
        "Measurement",
        "Address",
        "Quantity",
        "Percentage"
      ];
    }
  },
});
