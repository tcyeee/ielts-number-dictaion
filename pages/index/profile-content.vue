<template>
  <view class="container">
    <!-- Top Safe Area -->
    <safe-area-top size="s" />

    <view class="content">
      <!-- Header Section -->
      <view class="header">
        <view class="avatar-wrapper">
          <image class="avatar" src="https://api.dicebear.com/9.x/avataaars/png?seed=Alex&backgroundColor=ffdfbf" mode="aspectFill"></image>
          <view class="edit-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.653 1.053l-6.003 1.757 1.757-6.002c.247-.842.616-1.636 1.096-2.35L16.862 4.487zm0 0L19.5 7.125" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </view>
        </view>
        <text class="user-name">Alex</text>
        <text class="user-stats">Level 12 • 5 Day Streak</text>
        <view class="edit-profile-btn">
          <text class="btn-text">Edit Profile</text>
        </view>
      </view>

      <!-- Settings Group -->
      <view class="menu-group">
        <view class="menu-item" v-for="(item, index) in settingsList" :key="index">
          <view class="item-left">
            <view class="icon-box" :style="{ backgroundColor: item.bgColor }">
              <!-- Shield (Account Security) -->
              <svg v-if="item.icon === 'shield'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2b86ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="11" r="3" fill="#2b86ff" />
              </svg>

              <!-- Bell (Notification) -->
              <svg v-if="item.icon === 'bell'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#9d65ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#9d65ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <!-- Waveform (Audio) -->
              <svg v-if="item.icon === 'audio'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v18M8 8v8M4 11v2M16 7v10M20 10v4" stroke="#2b86ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <!-- Globe (Language) -->
              <svg v-if="item.icon === 'globe'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#00d26a" stroke-width="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#00d26a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </view>
            <text class="item-text">{{ item.text }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- Support Group -->
      <view class="menu-group">
        <view class="menu-item" v-for="(item, index) in supportList" :key="index">
          <view class="item-left">
            <view class="icon-box" :style="{ backgroundColor: item.bgColor }">
              <!-- Help (Question) -->
              <svg v-if="item.icon === 'help'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ff6b35" stroke-width="2" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="#ff6b35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 17h.01" stroke="#ff6b35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <!-- About (Info) -->
              <svg v-if="item.icon === 'info'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#8b9bb4" stroke-width="2" />
                <path d="M12 16v-4M12 8h.01" stroke="#8b9bb4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </view>
            <text class="item-text">{{ item.text }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>

    <bottom-nav :current="2" />
  </view>
</template>

<script>
import BottomNav from "@/components/bottom-nav/bottom-nav.vue";
import SafeAreaTop from "@/components/safe-area/safe-area-top.vue";

export default {
  components: {
    BottomNav,
    SafeAreaTop,
  },
  data() {
    return {
      settingsList: [
        {
          text: "Account Security",
          icon: "shield",
          bgColor: "rgba(43, 134, 255, 0.1)",
        },
        {
          text: "Notification Settings",
          icon: "bell",
          bgColor: "rgba(157, 101, 255, 0.1)",
        },
        {
          text: "Audio Quality",
          icon: "audio",
          bgColor: "rgba(43, 134, 255, 0.1)",
        },
        {
          text: "Language Preferences",
          icon: "globe",
          bgColor: "rgba(0, 210, 106, 0.1)",
        },
      ],
      supportList: [
        {
          text: "Help & Support",
          icon: "help",
          bgColor: "rgba(255, 107, 53, 0.1)",
        },
        {
          text: "About Us",
          icon: "info",
          bgColor: "rgba(139, 155, 180, 0.1)",
        },
      ],
    };
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
  margin-bottom: 40rpx;
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

.arrow {
  font-size: 40rpx;
  color: $text-sub;
  font-weight: 300;
  margin-right: -10rpx;
}
</style>
