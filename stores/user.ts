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
        // 排除仅本地管理的设置 (themeMode, currentLanguage)
        const { themeMode, currentLanguage, ...settingsToSync } = this.settings;
        await saveUserSettings(settingsToSync as UserSettings);
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
      // 主题设置仅本地管理，不同步到后台
      // this.syncSettings();
    },
    setLanguage(lang: string) {
      this.settings.currentLanguage = lang;
      uni.setStorageSync("language", lang);
      // @ts-ignore
      i18n.global.locale = lang;
      // 语言设置仅本地管理，不同步到后台
      // this.syncSettings();
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
        if (settings) {
          // 这里的合并逻辑确保了如果后端返回空，或者部分字段，我们依然保留默认值
          const newSettings = { ...this.settings, ...settings };

          // 保持本地的主题和语言设置不被覆盖
          newSettings.themeMode = this.settings.themeMode;
          newSettings.currentLanguage = this.settings.currentLanguage;

          // 深度合并 notification 对象
          if (settings.notification) {
            newSettings.notification = { ...this.settings.notification, ...settings.notification };
          }

          this.settings = newSettings;

          // 如果有主题设置，需要触发副作用（本地存储+通知）
          // 由于主题现在只在本地管理，且上面已经强制保留了本地设置，这里的逻辑其实是多余的，
          // 但为了防止逻辑错误（比如本地被意外清空），保留副作用触发也是安全的，只要值是正确的。
          // 既然我们已经确保 newSettings.themeMode 是本地的值，那么这里再次触发可能是不必要的，
          // 除非我们想确保系统状态一致。
          // 但考虑到 fetchUserSettings 主要用于从云端拉取，如果云端不存，那就不应该用云端的值去触发变化。
          // 实际上，因为我们上面强制覆盖了 newSettings.themeMode = this.settings.themeMode，
          // 所以这里 themeMode 没变，触发也没关系，或者干脆去掉这段逻辑。
          // 不过，如果这是首次加载，this.settings.themeMode 来自 localStorage，
          // 触发一下副作用（如通知 App.vue）可能是个好主意，确保 UI 状态正确。
          if (newSettings.themeMode) {
            // 只更新本地存储和触发事件，不调用 setThemeMode 以避免重复保存 (syncSettings)
            uni.setStorageSync("themeMode", newSettings.themeMode);
            uni.$emit('themeChange', newSettings.themeMode);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user settings:", error);
        // 失败时保持默认配置
      }
    }
  },
});
