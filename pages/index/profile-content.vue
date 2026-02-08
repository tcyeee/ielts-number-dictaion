<template>
  <view class="container">
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
        <text class="user-stats">Level {{ userInfo.level }} • {{ userInfo.streak }} Day Streak</text>
        <view class="edit-profile-btn">
          <text class="btn-text">Edit Profile</text>
        </view>
      </view>

      <!-- Dark Mode Group -->
      <view class="menu-group">
        <view class="menu-item">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(255, 179, 0, 0.1)">
              <!-- Sun Icon -->
              <view class="icon--feather--sun" style="width: 40rpx; height: 40rpx; color: #ffb300;"></view>
            </view>
            <text class="item-text">Dark Mode</text>
          </view>
          <switch :checked="isDarkMode" color="#2b86ff" style="transform:scale(0.8)" @change="toggleDarkMode" />
        </view>
      </view>

      <!-- Settings Group -->
      <view class="menu-group">
        <!-- Notification Settings -->
        <view class="menu-item" @click="onNotificationClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(157, 101, 255, 0.1)">
              <!-- Bell Icon -->
              <view class="icon--feather--bell" style="width: 40rpx; height: 40rpx; color: #9d65ff;"></view>
            </view>
            <text class="item-text">Notification Settings</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Questions Per Session -->
        <view class="menu-item">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(43, 134, 255, 0.1)">
              <!-- List Icon -->
              <view class="icon--feather--list" style="width: 40rpx; height: 40rpx; color: #2b86ff;"></view>
            </view>
            <text class="item-text">Questions Per Session</text>
          </view>
          <view class="item-right">
            <text class="value-text">{{ questionsPerSession }}</text>
            <text class="arrow">›</text>
          </view>
        </view>

        <!-- App Language -->
        <view class="menu-item">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(0, 210, 106, 0.1)">
              <!-- Globe Icon -->
              <view class="icon--feather--globe" style="width: 40rpx; height: 40rpx; color: #00d26a;"></view>
            </view>
            <text class="item-text">App Language</text>
          </view>
          <view class="segment-control">
            <view class="segment-option" :class="{ active: currentLanguage === 'EN' }" @click="setLanguage('EN')">EN</view>
            <view class="segment-option" :class="{ active: currentLanguage === 'CN' }" @click="setLanguage('CN')">CN</view>
          </view>
        </view>
      </view>

      <!-- Support Group -->
      <view class="menu-group">
        <!-- Privacy Policy -->
        <view class="menu-item" @click="onPrivacyClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(255, 107, 53, 0.1)">
              <!-- Shield Icon -->
              <view class="icon--feather--shield" style="width: 40rpx; height: 40rpx; color: #ff6b35;"></view>
            </view>
            <text class="item-text">Privacy Policy</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Terms of Service -->
        <view class="menu-item" @click="onTermsClick">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(0, 191, 165, 0.1)">
              <!-- File Text Icon -->
              <view class="icon--feather--file-text" style="width: 40rpx; height: 40rpx; color: #00BFA5;"></view>
            </view>
            <text class="item-text">Terms of Service</text>
          </view>
          <text class="arrow">›</text>
        </view>

        <!-- Contact Us -->
        <button class="menu-item contact-btn" open-type="contact">
          <view class="item-left">
            <view class="icon-box" style="background-color: rgba(139, 155, 180, 0.1)">
              <!-- Info Icon -->
              <view class="icon--feather--info" style="width: 40rpx; height: 40rpx; color: #8b9bb4;"></view>
            </view>
            <text class="item-text">Contact Us</text>
          </view>
          <text class="arrow">›</text>
        </button>
      </view>

      <view class="copyright">
        <text class="copyright-text">© 2026 IELTS Dictation. All rights reserved.</text>
        <text class="copyright-text" style="font-size: 20rpx;">本应用为第三方备考工具，与 IELTS 官方无任何隶属或合作关系</text>
      </view>

    </view>
  </view>
</template>

<script>
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";
import { navigateTo } from "@/utils/router";

export default {
  components: {
    SafeAreaTop,
  },
  data() {
    return {
      userInfo: {
        name: "Alex",
        level: 12,
        streak: 5,
        avatar:
          "https://api.dicebear.com/9.x/avataaars/png?seed=Alex&backgroundColor=ffdfbf",
      },
      isDarkMode: true,
      currentLanguage: "EN",
      questionsPerSession: 10,
    };
  },
  methods: {
    toggleDarkMode(e) {
      this.isDarkMode = e.detail.value;
      // Implement theme switching logic here
    },
    setLanguage(lang) {
      this.currentLanguage = lang;
      // Implement language switching logic here
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 200rpx; /* Space for bottom nav */
}

.content {
  padding: 20rpx 40rpx;
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
  border: 4rpx solid $card-bg;
}

.edit-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  background-color: $accent-blue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid $bg-color;
}

.user-name {
  font-size: 40rpx;
  font-weight: bold;
  color: $text-main;
  margin-bottom: 8rpx;
}

.user-stats {
  font-size: $uni-font-size-base;
  color: $text-sub;
  margin-bottom: 30rpx;
}

.edit-profile-btn {
  padding: 12rpx 40rpx;
  border: 2rpx solid #2c3545;
  border-radius: 40rpx;
  background-color: rgba(255, 255, 255, 0.05);
}

.btn-text {
  font-size: $uni-font-size-base;
  color: $text-main;
  font-weight: 500;
}

.menu-group {
  background-color: $card-bg;
  border-radius: 30rpx;
  padding: 10rpx 0;
  margin-bottom: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 40rpx;
  /* active state */
  &:active {
    background-color: $uni-bg-color-hover;
  }
}

.item-left {
  display: flex;
  align-items: center;
}

.icon-box {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30rpx;
}

.item-text {
  font-size: $uni-font-size-lg;
  color: $text-main;
  font-weight: 500;
}

.item-right {
  display: flex;
  align-items: center;
}

.value-text {
  font-size: $uni-font-size-base;
  color: $accent-blue;
  font-weight: 600;
  margin-right: 10rpx;
}

.arrow {
  font-size: 40rpx;
  color: $text-sub;
  font-weight: 300;
  margin-right: -10rpx;
  line-height: 1;
}

/* Segment Control */
.segment-control {
  display: flex;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
  padding: 4rpx;
}

.segment-option {
  padding: 8rpx 20rpx;
  font-size: 24rpx;
  color: $text-sub;
  border-radius: 8rpx;
  font-weight: 600;
  transition: all 0.2s;

  &.active {
    background-color: $accent-blue;
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

.copyright {
  text-align: center;
  padding: 40rpx 0;

  .copyright-text {
    font-size: 24rpx;
    color: $text-sub;
    display: block;
    margin-bottom: 10rpx;
  }
}
</style>
