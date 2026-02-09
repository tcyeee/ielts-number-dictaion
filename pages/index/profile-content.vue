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
        <view class="menu-item" @click="onNotificationClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(62, 45, 107, 0.4)">
              <!-- Bell Icon - Purple -->
              <view class="icon--feather--bell" style="width: 40rpx; height: 40rpx; color: #9d65ff;"></view>
            </view>
            <text class="item-text">Notifications</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Daily Practice Goal -->
        <view class="menu-item" @click="onDailyGoalClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(62, 28, 40, 0.4)">
              <!-- Target Icon - Red/Pink -->
              <view class="icon--feather--target" style="width: 40rpx; height: 40rpx; color: #ff5252;"></view>
            </view>
            <text class="item-text">Daily Practice Goal</text>
          </view>
          <view class="item-right">
            <text class="value-text">{{ dailyGoal }}</text>
            <text class="arrow">›</text>
          </view>
        </view>

        <!-- Question Preferences -->
        <view class="menu-item" @click="onQuestionPreferencesClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(22, 54, 50, 0.4)">
              <!-- Sliders Icon - Teal -->
              <view class="icon--feather--sliders" style="width: 40rpx; height: 40rpx; color: #00BFA5;"></view>
            </view>
            <text class="item-text">Question Preferences</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Questions Per Session -->
        <view class="menu-item" @click="onQuestionsPerSessionClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(26, 44, 66, 0.4)">
              <!-- List Icon - Blue -->
              <view class="icon--feather--list" style="width: 40rpx; height: 40rpx; color: #2b86ff;"></view>
            </view>
            <text class="item-text">Questions Per Session</text>
          </view>
          <view class="item-right">
            <text class="value-text">{{ questionsPerSession }}</text>
            <text class="arrow">›</text>
          </view>
        </view>
      </view>

      <!-- Settings Group 2 -->
      <view class="menu-group">
        <!-- App Language -->
        <view class="menu-item">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(22, 54, 30, 0.4)">
              <!-- Globe Icon - Green -->
              <view class="icon--feather--globe" style="width: 40rpx; height: 40rpx; color: #00d26a;"></view>
            </view>
            <text class="item-text">App Language</text>
          </view>
          <view class="segment-control">
            <view class="segment-option" :class="{ active: currentLanguage === 'EN' }" @click="setLanguage('EN')">EN</view>
            <view class="segment-option" :class="{ active: currentLanguage === 'CN' }" @click="setLanguage('CN')">CN</view>
          </view>
        </view>

        <!-- Theme -->
        <view class="menu-item theme-setting">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(66, 49, 10, 0.4)">
              <!-- Sun Icon - Orange/Yellow -->
              <view class="icon--feather--sun" style="width: 40rpx; height: 40rpx; color: #ffb300;"></view>
            </view>
            <text class="item-text">Theme</text>
          </view>
          <view class="theme-control">
            <view class="theme-option" :class="{ active: currentThemeMode === 'auto' }" @click="setTheme('auto')">
              AUTO
            </view>
            <view class="theme-option" :class="{ active: currentThemeMode === 'light' }" @click="setTheme('light')">
              LIGHT
            </view>
            <view class="theme-option" :class="{ active: currentThemeMode === 'dark' }" @click="setTheme('dark')">
              DARK
            </view>
          </view>
        </view>
      </view>

      <!-- Support Group -->
      <view class="menu-group">
        <!-- Privacy Policy -->
        <view class="menu-item" @click="onPrivacyClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(66, 30, 15, 0.4)">
              <!-- Shield Icon - Orange -->
              <view class="icon--feather--shield" style="width: 40rpx; height: 40rpx; color: #ff6b35;"></view>
            </view>
            <text class="item-text">Privacy Policy</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Terms of Service -->
        <view class="menu-item" @click="onTermsClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(22, 50, 45, 0.4)">
              <!-- File Text Icon - Teal -->
              <view class="icon--feather--file-text" style="width: 40rpx; height: 40rpx; color: #00BFA5;"></view>
            </view>
            <text class="item-text">Terms of Service</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Contact Us -->
        <button class="menu-item contact-btn" open-type="contact">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(45, 50, 60, 0.4)">
              <!-- Info Icon - Grey -->
              <view class="icon--feather--info" style="width: 40rpx; height: 40rpx; color: #8b9bb4;"></view>
            </view>
            <text class="item-text">Contact Us</text>
          </view>
          <text class="arrow">›</text>
        </button>
      </view>

    </view>
  </view>
</template>

<script>
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";
import { navigateTo } from "@/utils/router";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import themeMixin from "@/mixins/themeMixin.js";

export default {
  mixins: [themeMixin],
  components: {
    SafeAreaTop,
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

  methods: {
    ...mapActions(useUserStore, {
      updateLanguage: "setLanguage",
      updateTheme: "setThemeMode",
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
      // Future feature
      uni.showToast({
        title: "Daily Goal settings coming soon",
        icon: "none",
      });
    },
    onQuestionPreferencesClick() {
      // Future feature
      uni.showToast({
        title: "Question Preferences coming soon",
        icon: "none",
      });
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100rpx;
  background-color: rgba(255, 255, 255, 0.05);

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

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 32rpx;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: var(--hover-bg);
  }
}

.item-left {
  display: flex;
  align-items: center;
}

.icon-box {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.item-text {
  font-size: 30rpx;
  color: var(--text-main);
  font-weight: 500;
}

.item-right {
  display: flex;
  align-items: center;
}

.value-text {
  font-size: 28rpx;
  color: var(--accent-blue);
  font-weight: 600;
  margin-right: 12rpx;
}

.arrow {
  font-size: 32rpx;
  color: var(--text-sub);
  font-weight: 400;
  opacity: 0.5;
}

/* Segment Control */
.segment-control {
  display: flex;
  background-color: var(--hover-bg); // fallback if variable not set
  background: rgba(0, 0, 0, 0.2); // darker background for toggle track
  border-radius: 8rpx;
  padding: 4rpx;
}

.segment-option {
  padding: 8rpx 20rpx;
  font-size: 24rpx;
  color: var(--text-sub);
  border-radius: 6rpx;
  font-weight: 600;
  transition: all 0.2s;

  &.active {
    background-color: var(--accent-blue);
    color: #ffffff;
  }
}

/* Theme Control */
.theme-control {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8rpx;
  padding: 4rpx;
  gap: 2rpx;
}

.theme-option {
  padding: 8rpx 16rpx;
  font-size: 20rpx;
  color: var(--text-sub);
  border-radius: 6rpx;
  font-weight: 700;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  text-transform: uppercase;

  &.active {
    background-color: var(--accent-blue);
    color: #ffffff;
  }
}

.contact-btn {
  background-color: transparent;
  line-height: inherit;
  border-radius: 0;
  border: none;
  margin: 0;
  text-align: left;
  font-size: inherit;
  color: inherit;

  &::after {
    border: none;
  }
}

/* Dark mode adjustments for icon backgrounds to match design */
@media (prefers-color-scheme: dark) {
  .segment-control,
  .theme-control {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>