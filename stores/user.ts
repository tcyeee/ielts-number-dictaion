import { defineStore } from 'pinia';
import { getUserSettings, saveUserSettings, getUserProfile, saveUserProfile } from '@/service/api';
import type { UserSettings, ThemeMode, NotificationSettings, QuestionCategory } from '@/typing/UserSettings';
import type { UserProfile } from '@/typing/UserProfile';
import i18n from '@/locale/index';

declare const uni: any;

export const useUserStore = defineStore('user', {
  state: () => {
    // 从本地存储读取主题设置，默认为 auto（跟随系统）
    const savedTheme = (uni.getStorageSync("themeMode") || "auto") as ThemeMode;
    const savedLang = uni.getStorageSync("language") || "zh-Hans";
    const token = uni.getStorageSync("token") || "";
    const openid = uni.getStorageSync("openid") || "";
    const savedUserInfo = uni.getStorageSync("userInfo");

    const defaultUserInfo = {
      nickname: "Alex",
      level: 12,
      streak: 5,
      avatar: "https://api.dicebear.com/9.x/avataaars/png?seed=Alex&backgroundColor=ffdfbf",
    };

    return {
      token,
      openid,
      loading: false,
      userInfo: savedUserInfo ? JSON.parse(savedUserInfo) : defaultUserInfo,
      settings: {
        themeMode: savedTheme,
        currentLanguage: savedLang,
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
      } as UserSettings
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
      uni.setStorageSync("userInfo", JSON.stringify(this.userInfo));
    },
    async syncSettings() {
      try {
        await saveUserSettings(this.settings);
      } catch (error) {
        console.error("Failed to sync settings:", error);
      }
    },
    setThemeMode(mode: ThemeMode) {
      this.settings.themeMode = mode;
      // 持久化存储主题设置
      uni.setStorageSync("themeMode", mode);

      // 触发主题更新（通过自定义事件通知 App.vue）
      uni.$emit('themeChange', mode);
      this.syncSettings();
    },
    setLanguage(lang: string) {
      this.settings.currentLanguage = lang;
      uni.setStorageSync("language", lang);
      // @ts-ignore
      i18n.global.locale = lang;
      this.syncSettings();
    },
    setQuestionsPerSession(count: number) {
      this.settings.questionsPerSession = count;
      this.syncSettings();
    },
    setDailyGoal(count: number) {
      this.settings.dailyGoal = count;
      this.syncSettings();
    },
    updateNotificationSettings(settings: Partial<NotificationSettings>) {
      this.settings.notification = { ...this.settings.notification, ...settings };
      this.syncSettings();
    },
    updateQuestionTypes(types: QuestionCategory[]) {
      this.settings.questionTypes = types;
      this.syncSettings();
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
      ] as QuestionCategory[];
      this.syncSettings();
    },
    async fetchUserProfile() {
      try {
        const profile = (await getUserProfile()).profile;
        console.log(profile);
        if (profile) {
          const updates: any = {};
          if (profile.nickname) {
            updates.nickname = profile.nickname;
          }
          if (profile.avatarBase64) {
            updates.avatar = profile.avatarBase64;
          }
          // Use updateUserInfo to ensure reactivity and persistence
          if (Object.keys(updates).length > 0) {
            this.updateUserInfo(updates);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
    async syncUserProfile(profile: UserProfile) {
      try {
        await saveUserProfile(profile);
        // Update local state
        const updates: any = {};
        if (profile.nickname) {
          updates.nickname = profile.nickname;
        }
        if (profile.avatarBase64) {
          updates.avatar = profile.avatarBase64;
        }
        // Use updateUserInfo to ensure reactivity and persistence
        if (Object.keys(updates).length > 0) {
          this.updateUserInfo(updates);
        }
      } catch (error) {
        console.error("Failed to sync user profile:", error);
        throw error;
      }
    },
    async fetchUserSettings() {
      try {
        const settings = (await getUserSettings()).settings;
        console.log(settings);
        if (settings) {
          // 这里的合并逻辑确保了如果后端返回空，或者部分字段，我们依然保留默认值
          // 深度合并 notification 对象
          if (settings.notification) {
            this.settings.notification = { ...this.settings.notification, ...settings.notification };
          }

          // 合并其他顶层属性
          this.settings = { ...this.settings, ...settings };

          // 确保 notification 是合并后的结果 (because the line above overwrites it if settings.notification exists)
          // Actually, { ...this.settings, ...settings } will overwrite this.settings.notification with settings.notification
          // So if settings.notification is partial, we lose the defaults for missing keys in notification?
          // Let's refine the merge strategy.

          // Better approach:
          // 1. Merge top level
          // 2. If notification exists in fetched settings, merge it carefully

          // Re-thinking:
          const newSettings = { ...this.settings, ...settings };
          if (settings.notification) {
            newSettings.notification = { ...this.settings.notification, ...settings.notification };
          }
          this.settings = newSettings;

          // 如果有主题设置，需要触发副作用（本地存储+通知）
          if (settings.themeMode) {
            this.setThemeMode(settings.themeMode);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user settings:", error);
        // 失败时保持默认配置
      }
    }
  },
});
