<template>
  <view class="container" :data-theme="pageThemeAttr">
    <!-- Top Safe Area -->
    <safe-area-top size="s" />

    <view class="content">
      <!-- Header Section -->
      <view class="header">
        <view class="avatar-wrapper">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
          <view class="edit-badge">
            <view class="icon--feather--edit" style="width: 28rpx; height: 28rpx; color: white;"></view>
          </view>
        </view>
        <text class="user-name">{{ userInfo.name }}</text>
        <view class="edit-profile-btn" @click="onEditProfileClick">
          <text class="btn-text">Edit Profile</text>
        </view>
      </view>

      <!-- Settings Group 1 -->
      <view class="menu-group">
        <!-- Notification Settings -->
        <profile-menu-item title="Notifications" icon="icon--feather--bell" icon-color="#9d65ff" icon-bg-class="purple" @click="onNotificationClick" />
        <!-- Daily Practice Goal -->
        <profile-menu-item title="Daily Practice Goal" icon="icon--feather--target" icon-color="#ff5252" icon-bg-class="red" :value="dailyGoal" @click="onDailyGoalClick" />
        <!-- Question Preferences -->
        <profile-menu-item title="Question Preferences" icon="icon--feather--sliders" icon-color="#00BFA5" icon-bg-class="teal" @click="onQuestionPreferencesClick" />
        <!-- Questions Per Session -->
        <profile-menu-item title="Questions Per Session" icon="icon--feather--list" icon-color="#2b86ff" icon-bg-class="blue" :value="questionsPerSession" @click="onQuestionsPerSessionClick" />
      </view>

      <!-- Settings Group 2 -->
      <view class="menu-group">
        <!-- App Language -->
        <profile-menu-item title="App Language" icon="icon--feather--globe" icon-color="#00d26a" icon-bg-class="green" :show-arrow="false">
          <template #right>
            <segment-control :model-value="currentLanguage" :options="languageOptions" @update:model-value="setLanguage" />
          </template>
        </profile-menu-item>

        <!-- Theme -->
        <profile-menu-item title="Theme" icon="icon--feather--sun" icon-color="#ffb300" icon-bg-class="yellow" :show-arrow="false">
          <template #right>
            <segment-control :model-value="currentThemeMode" :options="themeOptions" @update:model-value="setTheme" />
          </template>
        </profile-menu-item>
      </view>

      <!-- Support Group -->
      <view class="menu-group">
        <!-- Privacy Policy -->
        <profile-menu-item title="Privacy Policy" icon="icon--feather--shield" icon-color="#ff6b35" icon-bg-class="orange" @click="onPrivacyClick" />
        <!-- Terms of Service -->
        <profile-menu-item title="Terms of Service" icon="icon--feather--file-text" icon-color="#00BFA5" icon-bg-class="teal" @click="onTermsClick" />
        <!-- Contact Us -->
        <profile-menu-item title="Contact Us" icon="icon--feather--message-square" icon-color="#2b86ff" icon-bg-class="blue" open-type="contact" />
      </view>

    </view>
  </view>
</template>

<script>
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";
import SegmentControl from "@/components/profile/segment-control.vue";
import ProfileMenuItem from "@/components/profile/profile-menu-item.vue";
import { navigateTo } from "@/utils/router";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import themeMixin from "@/mixins/themeMixin.js";

export default {
  mixins: [themeMixin],
  components: {
    SafeAreaTop,
    SegmentControl,
    ProfileMenuItem,
  },

  data() {
    return {
      languageOptions: [
        { label: "EN", value: "EN" },
        { label: "CN", value: "CN" },
      ],
      themeOptions: [
        { label: "AUTO", value: "auto" },
        { label: "LIGHT", value: "light" },
        { label: "DARK", value: "dark" },
      ],
    };
  },

  computed: {
    ...mapState(useUserStore, ["userInfo", "settings"]),
    currentLanguage() {
      return this.settings.currentLanguage;
    },
    questionsPerSession() {
      return this.settings.questionsPerSession;
    },
    dailyGoal() {
      return this.settings.dailyGoal || 10;
    },
    currentThemeMode() {
      return this.settings.themeMode;
    },
  },

  mounted() {
    this.fetchUserProfile();
  },

  methods: {
    ...mapActions(useUserStore, {
      updateLanguage: "setLanguage",
      updateTheme: "setThemeMode",
      fetchUserProfile: "fetchUserProfile",
    }),
    setLanguage(lang) {
      this.updateLanguage(lang);
    },
    setTheme(mode) {
      this.updateTheme(mode);
    },
    onEditProfileClick() {
      navigateTo("profileAvatar");
    },
    onPrivacyClick() {
      navigateTo("profilePrivacy");
    },
    onTermsClick() {
      navigateTo("profileTerms");
    },
    onNotificationClick() {
      navigateTo("profileNotification");
    },
    onQuestionsPerSessionClick() {
      navigateTo("profileQuestionsPerSession");
    },
    onDailyGoalClick() {
      navigateTo("profileDailyGoal");
    },
    onQuestionPreferencesClick() {
      navigateTo("profileQuestionPreferences");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: var(--bg-color);
  padding-bottom: 200rpx;
}

.content {
  padding: 20rpx 32rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40rpx;
  margin-bottom: 60rpx;
}

.avatar-wrapper {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 24rpx;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4rpx solid var(--card-bg);
}

.edit-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  background-color: var(--accent-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid var(--bg-color);
}

.user-name {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--text-main);
  margin-bottom: 24rpx;
}

.edit-profile-btn {
  padding: 12rpx 40rpx;
  border: 1px solid var(--border-color);
  border-radius: 100rpx;
  background-color: var(--hover-bg);

  .btn-text {
    font-size: 28rpx;
    color: var(--text-main);
    font-weight: 500;
  }
}

.menu-group {
  background-color: var(--card-bg);
  border-radius: 24rpx;
  margin-bottom: 30rpx;
  border: 1px solid var(--border-color);
  overflow: hidden;
}
</style>
